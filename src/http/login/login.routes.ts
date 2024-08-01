import { FastifyInstance } from "fastify";
import Login from "../../domain/Use-Cases/login.use-case";

class LoginRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/login', Login.executeUseCase);
}
}
export default LoginRoute;