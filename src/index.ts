import app from "./app";
import FormBody from './services/formbody';
import routesApplication from "./http/routes";
const server = app.initInstance();
FormBody.initFormBody(server);
routesApplication(server);


app.initServer();