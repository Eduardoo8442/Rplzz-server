import { FastifyReply } from "fastify";
import path from "path";
import * as dotenv from 'dotenv';
dotenv.config();



class UploadImageMessage {
    static async executeUseCase(request: any, reply: FastifyReply): Promise<void> {
        try {
            if (!request.file) {
              return reply.status(400).send('Nenhum arquivo foi enviado.');
            }
         
            const filePath = request.file.path;
            if (filePath) {
              const imageLink = `${process.env.URL}/uploads/${path.basename(filePath)}`;
              reply.status(200).send({ imageURL: imageLink });
            }
          } catch (error) {
            console.error('Erro ao processar upload:', error);
            reply.status(500).send('Erro ao processar upload.');
          }
    }
}

export default UploadImageMessage;
