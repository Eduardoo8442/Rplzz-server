import { FastifyInstance } from "fastify";

class MainRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.get('/', (request, reply) => {
        reply.send('API CARREGADA')
    });
}
}
export default MainRoute;