import { FastifyInstance } from 'fastify';

class CorsConfig {
    static initCors(instance: FastifyInstance): void {
        instance.register(require('@fastify/cors'), {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
        });
    }
}

export default CorsConfig;