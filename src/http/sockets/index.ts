//o index vai conter o connection do socket que vai importar os outros como socket.on
import SocketApp from "../../services/socketIO/socket.service";
import SendEmitUpdateListSideBar from "./sendEmitUpdateListSideBar";
import SendMessage from "./sendMessage";
import UpdateSideBarNotification from "./UpdateSideBarNotification";
export default function socketsInit(): void {
    const io = new SocketApp().getInstance();
    io.on('connection', (socket) => {
     console.log('novo usuário:', socket.id);
     new SendEmitUpdateListSideBar(socket, io).initConnection();
     new SendMessage(socket, io).initConnection();
     new UpdateSideBarNotification(socket, io).initConnection();
    });
}