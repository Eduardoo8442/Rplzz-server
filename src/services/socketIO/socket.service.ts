import { Server as SocketIOServer, ServerOptions } from 'socket.io';
import app from '../../app';

class SocketApp {
    private static io: SocketIOServer | null = null;

    constructor() {}

    getInstance(): SocketIOServer {
        if (SocketApp.io) return SocketApp.io;
        
        const fastifyInstance = app.initInstance();
        const server = fastifyInstance.server;

        const options: Partial<ServerOptions> = {
            cors: {
                origin: 'http://localhost:3000',
                methods: ['GET', 'POST']
            }
        };

        SocketApp.io = new SocketIOServer(server, options);
        return SocketApp.io;
    }
}

export default SocketApp;