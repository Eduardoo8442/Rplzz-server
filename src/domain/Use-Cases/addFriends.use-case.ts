import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";
import SocketApp from "../../services/socketIO/socket.service";
interface UserRequestBody {
    id: number;
    idInput: number;
}

class AddFriends {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
            const { id, idInput } = request.body;
            const io = new SocketApp().getInstance();
            if (!id || !idInput) {
                reply.status(400).send({ message: 'O ID seu e da pessoa é obrigatório.' });
                return;
            }

            const db = await DataBase.getInstance();


            const [rowsUserMain]: any = await db.query('SELECT * FROM Users WHERE idUser = ?', [id]);
            if (rowsUserMain.length === 0) {
                reply.status(401).send({ message: 'Seu ID é inválido.' });
                return;
            }


            const [rows]: any = await db.query('SELECT * FROM Users WHERE idUser = ?', [idInput]);
            if (rows.length === 0) {
                reply.status(401).send({ message: 'ID inválido.' });
                return;
            }

            const user = rows[0];
            const userMain = rowsUserMain[0];

            let updatedPending: any[] = [];
            try {
                updatedPending = JSON.parse(user.pending || '[]');
            } catch (error) {
                console.error('Erro ao parsear JSON:', error);
            }

            updatedPending.push({
                idUser: id,
                image: userMain.image,
                name: userMain.name
            });

 
            await db.query(
                'UPDATE Users SET pending = ? WHERE idUser = ?',
                [JSON.stringify(updatedPending), idInput]
            );
            io.emit('sendFriendship', rows[0].idUser);
            reply.status(200).send({ message: "Pedido enviado" });
        } catch (e) {
            console.error('Erro interno:', e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export default AddFriends;
