import { FastifyInstance } from "fastify";
import FriendsList from "../../domain/Use-Cases/friendsList.use-case";

class FriendsListRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/friendslist', FriendsList.executeUseCase);
}
}
export default FriendsListRoute;