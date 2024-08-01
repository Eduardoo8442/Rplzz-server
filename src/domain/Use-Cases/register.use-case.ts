import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";
import generateId from "../functions/generatorId";
import bcrypt from 'bcrypt';
interface UserRequestBody {
    name: string;
    email: string;
    password: string;
}

class Register {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
            const { name, email, password } = request.body;
            if (!name || !email || !password) throw new Error('Argumentos faltando');

          
            const db = await DataBase.getInstance();

            const [rows]: any = await db.query('SELECT * FROM Users WHERE email = ?', [email]);

            if (rows.length > 0) {
                reply.status(400).send({ message: 'A conta já está em uso.' });
            } else {
                const saltRounds = 10;
                const idUser = generateId();
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                await await db.query('INSERT INTO Users (idUser, name, email, password) VALUES (?, ?, ?, ?)', [Number(idUser), name, email, hashedPassword]);

                reply.status(201).send({ message: 'Usuário criado com sucesso.' });
            }

        } catch (e) {
            console.log(e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export default Register;
