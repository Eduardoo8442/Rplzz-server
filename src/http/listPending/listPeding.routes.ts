import { FastifyInstance } from "fastify";
import ListPending from "../../domain/Use-Cases/listPending.use-case";

class ListPendingRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/listpending', ListPending.executeUseCase);
}
}
export default ListPendingRoute;