import { FastifyReply } from "fastify";
import path from "path";
import * as dotenv from 'dotenv';
import DataBase from "../../database";
dotenv.config();



class UploadImage {
    static async executeUseCase(request: any, reply: FastifyReply): Promise<void> {
        try {
            if (!request.file) {
              return reply.status(400).send('Nenhum arquivo foi enviado.');
            }
            const { id } = request.body || request.id;
            
            if (id == null) {
                reply.status(400).send({ message: 'Faltando ID para a requisição' });
                return;
            }
            const db = await DataBase.getInstance();


            const [userRows]: any = await db.query('SELECT * FROM Users WHERE idUser = ?', [id]);
            if (userRows.length === 0) {
              reply.status(401).send({ message: 'Seu ID é inválido.' });
              return;
          }
            const filePath = request.file.path;
            if (filePath) {
              const imageLink = `${process.env.URL}/uploads/${path.basename(filePath)}`;
              await db.query(
                'UPDATE Users SET image = ? WHERE idUser = ?',
                [JSON.stringify(imageLink), id]
            );
              reply.status(200).send({ imageLink });
            }
          } catch (error) {
            console.error('Erro ao processar upload:', error);
            reply.status(500).send('Erro ao processar upload.');
          }
    }
}

export default UploadImage;
