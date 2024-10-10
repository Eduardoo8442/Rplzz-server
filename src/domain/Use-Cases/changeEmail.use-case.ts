import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";
import { isEmail } from "validator";
interface UserRequestBody {
    id: number;
    newEmail: string;
}

class ChangeEmail {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
            const { id, newEmail } = request.body;
            if (!id) {
                reply.status(400).send({ message: 'O ID é obrigatório.' });
                return;
            }
            if (!newEmail) {
                reply.status(400).send({ message: 'O novo email é obrigatório.' });
                return;
            }
            if(!isEmail(newEmail)) {
                reply.status(401).send({ message: 'email inválido' });
                return;
               }
            const db = await DataBase.getInstance();


            const [rowsUserMain]: any = await db.query('SELECT * FROM Users WHERE idUser = ?', [id]);
            if (rowsUserMain.length === 0) {
                reply.status(401).send({ message: 'Seu ID é inválido.' });
                return;
            }
            const [existsEmail]: any = await db.query('SELECT * FROM Users WHERE email = ?', [newEmail]);
            if (existsEmail.length !== 0) {
                reply.status(401).send({ message: 'Já existe alguém com este email', teste: "a" });
                return;
            }

            const user = rowsUserMain[0];


 
            await db.query(
                'UPDATE Users SET email = ? WHERE idUser = ?',
                [newEmail, id]
            );
            reply.status(200).send({ newEmail: newEmail });
        } catch (e) {
            console.error('Erro interno:', e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export default ChangeEmail;
