import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";
import SocketApp from "../../services/socketIO/socket.service";
interface UserRequestBody {
    id: number;
    idFriend: number;
}

class ConfirmFriend {
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
            const [userRowsFriends]: any = await db.query('SELECT * FROM InfoUser WHERE idUser = ?', [id]);
            const [friendRows]: any = await db.query('SELECT * FROM Users WHERE idUser = ?', [idFriend]);
            const [friendRowsFriends]: any = await db.query('SELECT * FROM InfoUser WHERE idUser = ?', [idFriend]);

            if (userRows.length === 0) {
                reply.status(401).send({ message: 'Seu ID é inválido.' });
                return;
            }
            if (friendRows.length === 0) {
                reply.status(401).send({ message: 'ID de amigo inválido.' });
                return;
            }

            const user = userRows[0];
            const friend = friendRows[0];

            let pendingList: any[] = [];
            try {
                pendingList = JSON.parse(user.pending || '[]');
            } catch (error) {
                console.error('Erro ao parsear JSON de pending:', error);
            }


            if (!pendingList.some((pending: any) => pending.idUser === idFriend)) {
                reply.status(400).send({ message: 'Amigo não está na lista de pendentes.' });
                return;
            }


            const updatedPendingList = pendingList.filter((pending: any) => pending.idUser !== idFriend);

            await db.query(
                'UPDATE Users SET pending = ? WHERE idUser = ?',
                [JSON.stringify(updatedPendingList), id]
            );
         
            const updatedFriendListForUser = ConfirmFriend.getFriendsList(userRowsFriends[0], friend);
           const updatedFriendListForFriend = ConfirmFriend.getFriendsList(friendRowsFriends[0], user);
            await db.query(
                'UPDATE InfoUser SET friends = ? WHERE idUser = ?',
                [JSON.stringify(updatedFriendListForUser), id]
            );
             await db.query(
                'UPDATE InfoUser SET friends = ? WHERE idUser = ?',
                [JSON.stringify(updatedFriendListForFriend), idFriend]
            );
            io.emit('sendFriendship', id);
            reply.status(200).send({ message: 'Amizade confirmada com sucesso.' });

        } catch (e) {
            console.error('Erro interno:', e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
    static getFriendsList(user: any, twoUser: any) {
        let friendsList: any[] = [];
        try {
            friendsList = JSON.parse(user.friends || '[]');
        } catch (error) {
            console.error('Erro ao parsear JSON de friends:', error);
        }
        const updatedFriendsList = [
            ...friendsList,
            {
                idUser: twoUser.idUser,
                image: twoUser.image,
                name: twoUser.name,
                notification: 0
            }
        ];
        return updatedFriendsList;
    }
}

export default ConfirmFriend;
