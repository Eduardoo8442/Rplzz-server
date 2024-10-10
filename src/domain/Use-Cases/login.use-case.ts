import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";
import bcrypt from 'bcrypt';
import generateToken from "../functions/generatorToken";

interface UserRequestBody {
    email: string;
    password: string;
}

class Login {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
            const { email, password } = request.body;
            if (!email || !password) {
                reply.status(400).send({ message: 'Email e senha são obrigatórios.' });
                return;
            }

            const db = await DataBase.getInstance();

            const [rows]: any = await db.query('SELECT * FROM Users WHERE email = ?', [email]);

            if (rows.length === 0) {
                reply.status(401).send({ message: 'Email ou senha inválidos.' });
                return;
            }

            const user = rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                reply.status(401).send({ message: 'Email ou senha inválidos.' });
                return;
            }
            const token = generateToken(user.idUser);
          
            reply.send({ token: token, idUser: user.idUser, name: user.name, email: user.email, image: user.image });

        } catch (e) {
            console.log(e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export default Login;
