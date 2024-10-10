import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";

interface UserRequestBody {
    id: number;
    idFriend: number;
}

class ChatList {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
            const { id, idFriend } = request.body;
            if (!id || !idFriend) {
                reply.status(400).send({ message: 'O ID seu e do amigo é obrigatório.' });
                return;
            }
            const db = await DataBase.getInstance();

            const [rows]: any = await db.query('SELECT * FROM InfoUser WHERE idUser = ?', [id]);

            if (rows.length === 0) {
                reply.status(401).send({ message: 'ID inválido.' });
                return;
            }

            const user = rows[0];
            let chatList = [];
            try {
                chatList = JSON.parse(user.chat || '[]');
            } catch (error) {
                console.error('Erro ao parsear JSON de chat:', error);
                reply.status(500).send({ message: 'Erro ao processar dados de chat.' });
                return;
            }

            const filteredChatList = chatList.filter((chat: any) => String(chat.idFriend) === String(idFriend) && String(chat.idUser) || String(chat.idUser) === String(idFriend) && String(chat.idFriend) === String(id));
            reply.status(200).send({ chat: filteredChatList });
        } catch (e) {
            console.log(e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export default ChatList;
