import MainRoute from "./main/main.routes";
import RegisterRoute from "./register/register.routes";
import LoginRoute from "./login/login.routes";
import { FastifyInstance } from "fastify";
export default function routesApplication(instance: FastifyInstance): void {
    new MainRoute(instance).initConnection();
    new RegisterRoute(instance).initConnection();
    new LoginRoute(instance).initConnection();
}