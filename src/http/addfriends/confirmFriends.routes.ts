import { FastifyInstance } from "fastify";
import ConfirmFriend from "../../domain/Use-Cases/confirmFriend.use-case";

class ConfirmFriendRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/confirmfriend', ConfirmFriend.executeUseCase);
}
}
export default ConfirmFriendRoute;