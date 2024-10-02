import { FastifyRequest, FastifyReply } from "fastify";
import DataBase from "../../database";


interface UserRequestBody {
    id: number
}

class ListPending {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
          const { id } = request.body;
          if (!id) {
            reply.status(400).send({ message: 'o ID é obrigatório.' });
            return;
        }
        const db = await DataBase.getInstance();

            const [rows]: any = await db.query('SELECT * FROM Users WHERE idUser = ?', [id]);

            if (rows.length === 0) {
                reply.status(401).send({ message: 'ID inválido.' });
                return;
            }
            
            const user = rows[0];
            reply.status(200).send({ pending: user.pending })
        } catch (e) {
            console.log(e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export default ListPending;
