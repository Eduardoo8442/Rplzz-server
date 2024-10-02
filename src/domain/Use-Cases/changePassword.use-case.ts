import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";
import bcrypt from 'bcrypt';
interface UserRequestBody {
    id: number;
    newPassword: string;
}

class ChangePassword {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
            const { id, newPassword } = request.body;
            if (!id) {
                reply.status(400).send({ message: 'O ID é obrigatório.' });
                return;
            }
            if (!newPassword) {
                reply.status(400).send({ message: 'A nova senha é obrigatório.' });
                return;
            }
            if(newPassword.length < 6) {
                reply.status(401).send({ message: 'Senha muito pequeno' });
                return;
               }
            const db = await DataBase.getInstance();


            const [rowsUserMain]: any = await db.query('SELECT * FROM Users WHERE idUser = ?', [id]);
            if (rowsUserMain.length === 0) {
                reply.status(401).send({ message: 'Seu ID é inválido.' });
                return;
            }


            const user = rowsUserMain[0];

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            await db.query(
                'UPDATE Users SET password = ? WHERE idUser = ?',
                [hashedPassword, id]
            );
            reply.status(200).send({ newPassword: newPassword });
        } catch (e) {
            console.error('Erro interno:', e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export default ChangePassword;
