import { extname } from 'path';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { diskStorage } from 'multer';
import { Request } from 'express';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Injectable()
export class RenameFilesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: any = context.switchToHttp().getRequest<Request>();

    request.files.map((file) => {
      const originalname = file.originalname;
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const newFilename = `${uniqueName}${extname(originalname)}`;

      file.filename = newFilename;
      return file;
    });

    return next.handle();
  }
}
