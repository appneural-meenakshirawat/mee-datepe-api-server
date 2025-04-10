import { IResponse } from '../interfaces/response.interface';
export declare class ResponseError implements IResponse {
    constructor(errorCode: string, path?: string, error?: any, data?: any);
    statusCode: number;
    message: string;
    data: any;
    error: any;
    path: string;
    success: boolean;
}
export declare class ResponseSuccess implements IResponse {
    constructor(infoMessage: string, data?: any, statusCode?: number, notLog?: boolean);
    statusCode: number;
    message: string;
    data: any;
    error: any;
    success: boolean;
}
