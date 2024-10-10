import { FastifyInstance } from "fastify";
import Register from "../../domain/Use-Cases/register.use-case";

class RegisterRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/register', Register.executeUseCase);
}
}
export default RegisterRoute;