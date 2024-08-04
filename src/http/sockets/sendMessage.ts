import { Socket, Server } from "socket.io";
class SendMessage {
    constructor(private readonly socket: Socket, private readonly io: Server) {}

    public initConnection(): void {
        this.socket.on('sendMessage', (data: any) => {
            this.io.emit('emitMessage', data);
        });
    }
}
export default SendMessage;