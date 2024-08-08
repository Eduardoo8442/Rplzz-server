import { FastifyInstance } from "fastify";
import UploadImage from "../../domain/Use-Cases/upload.use-case";
import multerInstance from "../../services/multer/multer.service";
import UploadImageMessage from "../../domain/Use-Cases/uploadImageMessage.use-case";
class UploadImageMessageRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/uploadimagemessage', { preHandler: multerInstance.single('file') }, UploadImageMessage.executeUseCase);
}
}
export default UploadImageMessageRoute;