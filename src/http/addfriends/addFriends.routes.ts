import { FastifyInstance } from "fastify";
import AddFriends from "../../domain/Use-Cases/addFriends.use-case";

class AddFriendsRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/addfriends', AddFriends.executeUseCase);
}
}
export default AddFriendsRoute;