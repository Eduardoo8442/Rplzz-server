import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";
import SocketApp from "../../services/socketIO/socket.service";
interface UserRequestBody {
    id: number;
    idFriend: number;
}

class RecuseFriend {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
            const { id, idFriend } = request.body;
            const io = new SocketApp().getInstance();
            if (id == null || idFriend == null) {
                reply.status(400).send({ message: 'Faltando ID seu ou da pessoa' });
                return;
            }

            const db = await DataBase.getInstance();


            const [userRows]: any = await db.query('SELECT * FROM Users WHERE idUser = ?', [id]);

            if (userRows.length === 0) {
                reply.status(401).send({ message: 'Seu ID é inválido.' });
                return;
            }
            const user = userRows[0];

            let pendingList: any[] = [];
            try {
                pendingList = JSON.parse(user.pending || '[]');
            } catch (error) {
                console.error('Erro ao parsear JSON de pending:', error);
            }


            if (!pendingList.some((pending: any) => pending.idUser === idFriend)) {
                reply.status(400).send({ message: 'Usuário não está na lista de pendentes.' });
                return;
            }


            const updatedPendingList = pendingList.filter((pending: any) => pending.idUser !== idFriend);

            await db.query(
                'UPDATE Users SET pending = ? WHERE idUser = ?',
                [JSON.stringify(updatedPendingList), id]
            );
         

            reply.status(200).send({ message: 'Amizade recusada com sucesso.' });
            io.emit('sendFriendship', id);
        } catch (e) {
            console.error('Erro interno:', e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
   
}

export default RecuseFriend;
