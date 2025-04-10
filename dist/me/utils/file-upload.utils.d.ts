import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare const imageFileFilter: (req: any, file: any, callback: any) => any;
export declare const editFileName: (req: any, file: any, callback: any) => void;
export declare class RenameFilesInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
