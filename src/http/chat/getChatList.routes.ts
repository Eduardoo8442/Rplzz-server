import { FastifyInstance } from "fastify";
import ChatList from "../../domain/Use-Cases/getChatList.use-case";

class GetChatList {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/getchatlist', ChatList.executeUseCase);
}
}
export default GetChatList;