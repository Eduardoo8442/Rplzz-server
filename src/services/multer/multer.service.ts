import multer from 'fastify-multer';
import path from 'path';
import fs from 'fs';
import app from '../../app';
class MulterStorage {
  static getStorage() {
    const uploadPath = path.resolve(__dirname, '../../uploads');
    

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    return multer.diskStorage({
      destination: (req, file, cb: (error: Error | null, destination: string) => void): void => {
        cb(null, uploadPath);
      },
      filename: (req, file, cb: (error: Error | null, filename: string) => void): void => {
        const ext = path.extname(file.originalname);
        const timestamp = Date.now();
        const filename = `${file.fieldname}-${timestamp}${ext}`;
        cb(null, filename);
      }
    });
  }
}

class MulterConfig {

   private static registerMulter(): void {
    app.initInstance().register(multer.contentParser);
  }
  static getUpload() {
    this.registerMulter();
    return multer({
      storage: MulterStorage.getStorage(),
      fileFilter: (req, file, cb: (error: Error | null, acceptFile: boolean) => void): void => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|mkv|webm|avi|mov)$/)) {
          return cb(new Error('Apenas imagens e vídeos são permitidos!'), false);
      }      
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      }
    });
  }
}

const multerInstance = MulterConfig.getUpload();
export default multerInstance;