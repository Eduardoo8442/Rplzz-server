import MainRoute from "./main/main.routes";
import RegisterRoute from "./register/register.routes";
import LoginRoute from "./login/login.routes";
import FriendsListRoute from "./friendsList/friendsList.routes";
import AddFriendsRoute from "./addfriends/addFriends.routes";
import ListPendingRoute from "./listPending/listPeding.routes";
import ConfirmFriendRoute from "./addfriends/confirmFriends.routes";
import RecuseFriendsRoute from "./addfriends/recuseFriends.routes";
import GetChatList from "./chat/getChatList.routes";
import { FastifyInstance } from "fastify";
export default function routesApplication(instance: FastifyInstance): void {
    new MainRoute(instance).initConnection();
    new RegisterRoute(instance).initConnection();
    new LoginRoute(instance).initConnection();
    new FriendsListRoute(instance).initConnection();
    new AddFriendsRoute(instance).initConnection();
    new ListPendingRoute(instance).initConnection();
    new ConfirmFriendRoute(instance).initConnection();
    new RecuseFriendsRoute(instance).initConnection();
    new GetChatList(instance).initConnection();
}