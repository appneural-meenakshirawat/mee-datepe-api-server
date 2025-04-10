// import { ErrorCodes } from './../constants/error-codes.constant';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseError } from '../dtos/response.dto';
import { ErrorCodes } from '../constants/error-codes.constant';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    // const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception.status || 400;

    if (ErrorCodes[exception] && ErrorCodes[exception].statusCode) {
      status = ErrorCodes[exception].statusCode;
    }
    // if (typeof exception === 'string') {
    //   if (ErrorCodes[exception]) {
    //     const responseBody = {
    //       statusCode: ErrorCodes[exception].statusCode,
    //       message: ErrorCodes[exception].message,
    //       path: httpAdapter.getRequestUrl(ctx.getRequest()),
    //       timestamp: new Date().toISOString(),
    //     };
    //     httpAdapter.reply(ctx.getResponse(), responseBody, ErrorCodes[exception].statusCode);
    //     return;
    //   }
    // }
    // {
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   message: exception.message,
    //   error: exception.error,
    //   path: request.url,
    // }
    response
      .status(status)
      .json(
        new ResponseError(
          !exception?.message ? exception : exception.message,
          request.url,
          exception.errors,
        ),
      ); //exception.errors
  }
}
