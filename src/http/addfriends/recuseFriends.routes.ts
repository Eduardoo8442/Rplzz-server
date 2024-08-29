import { FastifyInstance } from "fastify";
import RecuseFriend from "../../domain/Use-Cases/recuseFriend.use-case";

class RecuseFriendsRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/recusefriend', RecuseFriend.executeUseCase);
}
}
export default RecuseFriendsRoute;