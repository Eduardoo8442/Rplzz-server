import { FastifyInstance } from "fastify";
import GetAccount from "../../domain/Use-Cases/getAccount.use-case";

class GetAccountRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/getaccount', GetAccount.executeUseCase);
}
}
export default GetAccountRoute;