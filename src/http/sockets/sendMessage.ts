import { Socket, Server } from "socket.io";
import { Connection } from "mysql2/promise";
import DataBase from "../../database";

class SendMessage {
    constructor(private readonly socket: Socket, private readonly io: Server) {}

    public initConnection(): void {
        this.socket.on('sendMessage', async (data: any) => {
            try {
                const db: Connection = await DataBase.getInstance(); 
                const [rows]: any = await db.query('SELECT * FROM InfoUser WHERE idUser = ?', [data.idUser]);
                const [rowsFriend]: any = await db.query('SELECT * FROM InfoUser WHERE idUser = ?', [data.idFriend]);

                if (rows.length === 0) {
                    console.log('id errado')
                    return;
                }

                if (rowsFriend.length === 0) {
                    console.log('id do amigo errado')
                    return;
                }
                const updatedChatListForUser = SendMessage.getChatList(data, rows[0]);
                const updatedChatListForFriend = SendMessage.getChatList(data, rowsFriend[0]);
                await db.query(
                    'UPDATE InfoUser SET chat = ? WHERE idUser = ?',
                    [JSON.stringify(updatedChatListForUser), data.idUser]
                );
                 await db.query(
                    'UPDATE InfoUser SET chat = ? WHERE idUser = ?',
                    [JSON.stringify(updatedChatListForFriend), data.idFriend]
                );
                this.io.emit('emitMessage', data);
            } catch (error) {
                console.error('Error querying the database:', error);
            }
        });
    }
    static getChatList(account: any, user: any) {
        let chatList: any[] = [];
        try {
            chatList = JSON.parse(user.chat || '[]');
        } catch (error) {
            console.error('Erro ao parsear JSON de chat:', error);
        }
        console.log(account.idUser, account.image)
        const updatedChatList = [
            ...chatList,
            {
                idUser: account.idUser,
                idFriend: account.idFriend,
                image: account.image,
                name: account.name,
                message: account.message
            }
        ];
        return updatedChatList;
    }
    
}
export default SendMessage;
