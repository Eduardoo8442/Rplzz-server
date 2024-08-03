import app from "./app";
import FormBody from './services/formbody';
import routesApplication from "./http/routes";
import DataBase from "./database";
import socketsInit from "./http/sockets";
const server = app.initInstance();
DataBase.initConnection();
FormBody.initFormBody(server);
routesApplication(server);
socketsInit();


app.initServer();