import Fastify, { FastifyInstance } from 'fastify';
import * as dotenv from 'dotenv';
import CorsConfig from './services/cors';
dotenv.config();

class App {
    private static app: FastifyInstance | null = null;
    private static running: boolean = false;

    public initInstance(): FastifyInstance {
        if (!App.app) {
            App.app = Fastify({ logger: true });
            CorsConfig.initCors(App.app);
        }
        return App.app;
    }

    public async initServer(): Promise<void> {
        if (!App.app || App.running) return;
        try {
            const port: number = Number(process.env.PORT) || 3000;
            await App.app.listen({ port, host: '0.0.0.0' });
            console.log(`Servidor está rodando em http://localhost:${port}`);
            this.setRunning(true);
        } catch (err) {
            console.log(err);
            process.exit(1);
        }
    }

    private setRunning(value: boolean): void {
        App.running = value;
    }
}

const app = new App();
export default app;