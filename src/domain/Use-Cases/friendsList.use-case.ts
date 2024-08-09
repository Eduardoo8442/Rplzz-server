import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";

interface UserRequestBody {
    id: number;
}

interface Friend {
    idUser: number;
    image: string | null;
}

class FriendsList {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
            const { id } = request.body;
            if (!id) {
                reply.status(400).send({ message: 'O ID é obrigatório.' });
                return;
            }
            
            const db = await DataBase.getInstance();
            const [rows]: any = await db.query('SELECT friends FROM InfoUser WHERE idUser = ?', [id]);

            if (rows.length === 0) {
                reply.status(401).send({ message: 'ID inválido.' });
                return;
            }

            const user = rows[0];
            const friendsList: Friend[] = JSON.parse(user.friends) || [];

            for (const friend of friendsList) {
                const [friendRows]: any = await db.query('SELECT image FROM Users WHERE idUser = ?', [friend.idUser]);
                if (friendRows.length > 0) {
                    friend.image = friendRows[0].image;
                } else {
                    friend.image = null;
                }
            }
            reply.status(200).send({ friends: friendsList });
        } catch (e) {
            console.log(e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export default FriendsList;
