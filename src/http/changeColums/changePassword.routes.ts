import { FastifyInstance } from "fastify";
import ChangePassword from "../../domain/Use-Cases/changePassword.use-case";
class ChangePasswordRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/changepassword', ChangePassword.executeUseCase);
}
}
export default ChangePasswordRoute;