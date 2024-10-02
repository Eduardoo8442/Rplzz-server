import { Socket, Server } from "socket.io";
import DataBase from "../../database";
class UpdateSideBarNotification {
    constructor(private readonly socket: Socket, private readonly io: Server) {}

    public async initConnection(): Promise<void> {
        const db = await DataBase.getInstance();
        this.socket.on('updateSideBarNotification', async ({ id, idFriend }: {id: string, idFriend: string}) => {

            const [userRows]: any = await db.query('SELECT * FROM InfoUser WHERE idUser = ?', [id]);
            if (userRows.length !== 0) {
            const indexOfUser = UpdateSideBarNotification.getNotificationsUser(userRows[0], idFriend);
            if(indexOfUser !== -1) {
                let friendsArray: any[] = [];

                try {
                    friendsArray = JSON.parse(userRows[0].friends);
                } catch (error) {
                    console.error("Erro ao analisar userRows[0].friends:", error);
                    throw new TypeError("Erro ao analisar userRows[0].friends");
                }
                if (!Array.isArray(friendsArray)) {
                    console.error("userRows[0].friends não é uma array após análise:", friendsArray);
                    throw new TypeError("userRows[0].friends não é uma array");
                }
                friendsArray[indexOfUser].notification = 0;
                console.log(friendsArray, id, friendsArray[indexOfUser])
                await db.query(
                    'UPDATE InfoUser SET friends = ? WHERE idUser = ?',
                    [JSON.stringify(friendsArray), id]
                );
                this.io.emit('alertEmitUpdateListSideBar', id, '000000');
            } 
            }
        });
    }
     
    static getNotificationsUser(user: any, idFriend: string) {
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
        const index = friendsArray.findIndex((friend: any) => String(friend.idUser) === String(idFriend));
        return index;
    }
}
export default UpdateSideBarNotification;