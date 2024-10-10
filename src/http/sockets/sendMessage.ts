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
                    console.log('id errado');
                    return;
                }

                if (rowsFriend.length === 0) {
                    console.log('id do amigo errado');      
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
             
                const indexOfUser = SendMessage.getNotificationsUser(rowsFriend[0], data);

                if (indexOfUser >= 0 && indexOfUser < rowsFriend[0].friends.length) {
                    let friendsArray: any[] = [];

                    try {
                        friendsArray = JSON.parse(rowsFriend[0].friends);
                    } catch (error) {
                        console.error("Erro ao analisar rowsFriend[0].friends:", error);
                        throw new TypeError("Erro ao analisar rowsFriend[0].friends");
                    }

                    if (!Array.isArray(friendsArray)) {
                        console.error("rowsFriend[0].friends não é uma array após análise:", friendsArray);
                        throw new TypeError("rowsFriend[0].friends não é uma array");
                    }


                    const friend = friendsArray[indexOfUser];
                    if (friend.notification === undefined) {
                        friend.notification = 0;
                    }

                    friend.notification += 1;
                    await db.query(
                        'UPDATE InfoUser SET friends = ? WHERE idUser = ?',
                        [JSON.stringify(friendsArray), data.idFriend]
                    );
                } else {
                    console.error("Índice inválido ou objeto não encontrado:", indexOfUser, rowsFriend[0].friends);
                }
                this.io.emit('alertEmitUpdateListSideBar', data.idFriend, '000000');
                this.io.emit('emitMessage', data);
            } catch (error) {
                console.error('Error querying the database:', error);
            }
        });
    }
    
    static getNotificationsUser(user: any, data: any) {
        let friendsArray: any[] = [];
        try {
            friendsArray = JSON.parse(user.friends);
        } catch (error) {
            console.error("Erro ao analisar user.friends:", error);
            throw new TypeError("Erro ao analisar user.friends");
        }  
        if (!Array.isArray(friendsArray)) {
            console.error("user.friends não é uma array após análise:", friendsArray);
            throw new TypeError("user.friends não é uma array");
        }
        const index = friendsArray.findIndex((friend: any) => String(friend.idUser) === String(data.idUser));
        return index;
    }

    static getChatList(account: any, user: any) {
        let chatList: any[] = [];
        try {
            chatList = JSON.parse(user.chat || '[]');
        } catch (error) {
            console.error('Erro ao parsear JSON de chat:', error);
        }
        const updatedChatList = [
            ...chatList,
            {
                idUser: account.idUser,
                idFriend: account.idFriend,
                image: account.image,
                name: account.name,
                message: account.message,
                imageorvideo: {
                    url: account.imageorvideo.url,
                    type: account.imageorvideo.type
                }
            }
        ];
        return updatedChatList;
    }
}

export default SendMessage;
