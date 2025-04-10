import { HttpStatus } from '@nestjs/common';
// success: true => message, data
// success: false => errorMessage, error
import { IResponse } from '../interfaces/response.interface';
import { ErrorCodes } from '../constants/error-codes.constant';

export class ResponseError implements IResponse {
  constructor(errorCode: string, path?: string, error?: any, data?: any) {
    this.statusCode = !ErrorCodes[errorCode]
      ? HttpStatus.BAD_REQUEST
      : ErrorCodes[errorCode].statusCode;
    this.success = false;
    this.message = !ErrorCodes[errorCode]
      ? errorCode
      : ErrorCodes[errorCode].message;
    this.error = error;
    this.data = data;
    this.path = path;
    // throw this;
    console.warn(
      new Date().toString() +
        ' - [Response]: ' +
        errorCode +
        (error ? ' - ' + JSON.stringify(error) : ''),
    );
  }
  statusCode: number;
  message: string;
  data: any;
  error: any;
  path: string;
  success: boolean;
}

export class ResponseSuccess implements IResponse {
  constructor(
    infoMessage: string,
    data?: any,
    statusCode?: number,
    notLog?: boolean,
  ) {
    this.statusCode = statusCode | 200;
    this.success = true;
    this.message = infoMessage;
    this.data = data;
    if (!notLog) {
      try {
        const offuscateRequest = JSON.parse(JSON.stringify(data));
        if (offuscateRequest && offuscateRequest.token)
          offuscateRequest.token = '*******';
      } catch (error) {}
    }
  }
  statusCode: number;
  message: string;
  data: any;
  error: any;
  success: boolean;
}
