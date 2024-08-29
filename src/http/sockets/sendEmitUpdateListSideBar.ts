import { Socket, Server } from "socket.io";
class SendEmitUpdateListSideBar {
    constructor(private readonly socket: Socket, private readonly io: Server) {}

    public initConnection(): void {
        this.socket.on('sendEmitUpdateListSideBar', ({ id, idFriend }: {id: number, idFriend: number}) => {
           if(id) {
            this.io.emit('alertEmitUpdateListSideBar', id, idFriend);
           }
        });
    }
}
export default SendEmitUpdateListSideBar;