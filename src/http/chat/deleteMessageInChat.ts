import { FastifyInstance } from "fastify";
import DeleteMessage from "../../domain/Use-Cases/deleteMessage.use-case";

class DeleteMessageInChat {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/deletemessageinchat', DeleteMessage.executeUseCase);
}
}
export default DeleteMessageInChat;