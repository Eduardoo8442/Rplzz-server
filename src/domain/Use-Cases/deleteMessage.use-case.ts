import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";
import SocketApp from "../../services/socketIO/socket.service";
interface UserRequestBody {
    id: number;
    idFriend: number;
    index: string;
}

class DeleteMessage {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
            const { id, idFriend, index } = request.body;
            if (!id || !idFriend || !index) {
                reply.status(400).send({ message: 'Campos faltando é obrigatório.' });
                return;
            }
            const db = await DataBase.getInstance();

            const [rows]: any = await db.query('SELECT * FROM InfoUser WHERE idUser = ?', [id]);

            if (rows.length === 0) {
                reply.status(401).send({ message: 'ID inválido.' });
                return;
            }

            const user = rows[0];
            const newChat = DeleteMessage.updateAndDeleteChatList(user, reply, index);
            await db.query(
                'UPDATE InfoUser SET chat = ? WHERE idUser = ?',
                [JSON.stringify(newChat), id]
            );
            await db.query(
                'UPDATE InfoUser SET chat = ? WHERE idUser = ?',
                [JSON.stringify(newChat), idFriend]
            );
            const io = new SocketApp().getInstance();
            io.emit('emitDeleteMessage', id, idFriend, index);
            reply.status(200).send({ message: 'mensagem deletada com sucesso.' });
        } catch (e) {
            console.log(e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
    static updateAndDeleteChatList(user: any, reply: FastifyReply, index: string) {
        let chatList = [];
        try {
            chatList = JSON.parse(user.chat || '[]');
            chatList.splice(Number(index), 1);
            return chatList;
        } catch (error) {
            console.error('Erro ao parsear JSON de chat:', error);
            reply.status(500).send({ message: 'Erro ao processar dados de chat.' });
            return false;
        }
    }
    
   
}

export default DeleteMessage;
