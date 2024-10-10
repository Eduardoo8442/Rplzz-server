import { FastifyInstance } from "fastify";
import UploadImage from "../../domain/Use-Cases/upload.use-case";
import multerInstance from "../../services/multer/multer.service";
class MulterRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/upload', { preHandler: multerInstance.single('file') }, UploadImage.executeUseCase);
}
}
export default MulterRoute;