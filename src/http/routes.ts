import MainRoute from "./main/main.routes";
import RegisterRoute from "./register/register.routes";
import LoginRoute from "./login/login.routes";
import FriendsListRoute from "./friendsList/friendsList.routes";
import AddFriendsRoute from "./addfriends/addFriends.routes";
import ListPendingRoute from "./listPending/listPeding.routes";
import ConfirmFriendRoute from "./addfriends/confirmFriends.routes";
import RecuseFriendsRoute from "./addfriends/recuseFriends.routes";
import GetChatList from "./chat/getChatList.routes";
import MulterRoute from "./upload/upload.routes";
import UploadImageMessageRoute from "./upload/uploadImageMessage.routes";
import ChangeEmailRoute from "./changeColums/changeEmail.routes";
import ChangePasswordRoute from "./changeColums/changePassword.routes";
import GetAccountRoute from "./Account/getAccount.routes";
import DeleteMessageInChat from "./chat/deleteMessageInChat";
import { FastifyInstance,FastifyRequest, FastifyReply  } from "fastify";
import jwt from 'jsonwebtoken';

export default function routesApplication(instance: FastifyInstance): void {
    // Hook de autenticação
    instance.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
        const unprotectedRoutes = ['/login', '/register', '/upload', '/uploadimagemessage'];
    
        const isProtectedRoute = !unprotectedRoutes.some(route =>
            request.routerPath?.startsWith(route)
        );
    
        if (isProtectedRoute) {
            const authHeader = request.headers['authorization'];
    
            if (!authHeader) {
                return reply.status(401).send({ message: 'Token não fornecido' });
            }
    
            const token = authHeader.split(' ')[1];
    
            try {
                const secretKey = process.env.JWT_SECRET_KEY!;
                jwt.verify(token, secretKey);
            } catch (error) {
                return reply.status(401).send({ message: 'Token inválido ou expirado' });
            }
        }
    });
    

    // Rotas da aplicação
    new MainRoute(instance).initConnection();
    new RegisterRoute(instance).initConnection();
    new LoginRoute(instance).initConnection();
    new FriendsListRoute(instance).initConnection();
    new AddFriendsRoute(instance).initConnection();
    new ListPendingRoute(instance).initConnection();
    new ConfirmFriendRoute(instance).initConnection();
    new RecuseFriendsRoute(instance).initConnection();
    new GetChatList(instance).initConnection();
    new MulterRoute(instance).initConnection();
    new UploadImageMessageRoute(instance).initConnection();
    new ChangeEmailRoute(instance).initConnection();
    new ChangePasswordRoute(instance).initConnection();
    new GetAccountRoute(instance).initConnection();
    new DeleteMessageInChat(instance).initConnection();
}