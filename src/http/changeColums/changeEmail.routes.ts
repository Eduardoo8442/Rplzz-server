import { FastifyInstance } from "fastify";
import ChangeEmail from "../../domain/Use-Cases/changeEmail.use-case";
class ChangeEmailRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/changeemail', ChangeEmail.executeUseCase);
}
}
export default ChangeEmailRoute;