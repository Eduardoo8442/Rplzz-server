import MainRoute from "./main/main.routes";
import { FastifyInstance } from "fastify";
export default function routesApplication(instance: FastifyInstance): void {
    new MainRoute(instance).initConnection();
}