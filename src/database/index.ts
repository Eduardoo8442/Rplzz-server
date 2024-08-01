import mysql, { Connection} from 'mysql2'
import * as dotenv from 'dotenv';
dotenv.config();
export default class DataBase {
    private static instance: boolean = false;
    private static database: Connection;

    static setInstance(value: boolean): void {
      this.instance = value;
    }

    static initConnection(): Connection {
        if(this.instance) {
           return this.database;
        }
        this.setInstance(true);
        this.database = mysql.createConnection({
            host: 'localhost',
            user: 'eduardoo',
            password: process.env.PASSWORDDB,
            database: 'rplzz_db'
          });
          this.database.connect((err) => {
            if (err) {
              console.error('Erro ao conectar ao banco de dados: ' + err.stack);
              return;
            }
            console.log('Conectado ao banco de dados com o id: ' + this.database.threadId);
          });
        return this.database;
    }

    static getInstance(): Connection {
    if(!this.instance) {
        return this.initConnection();
    }
    return this.database;
    }
}