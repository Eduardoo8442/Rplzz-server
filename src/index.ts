import app from "./app";
import FormBody from './services/formbody';
import routesApplication from "./http/routes";
import DataBase from "./database";
import socketsInit from "./http/sockets";
import path from "path";

const server = app.initInstance();
DataBase.initConnection();
FormBody.initFormBody(server);
routesApplication(server);
socketsInit();
server.register(require('@fastify/static'), {
root: path.join(__dirname, 'uploads'),
prefix: '/uploads/', 
});


app.initServer();