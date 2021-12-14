import { Catch, ArgumentsHost, HttpException, HttpStatus, Logger, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GlobalExceptionsFilter extends BaseExceptionFilter {
    logger = new Logger('GlobalExceptionsFilter');

    catch(e: unknown, host: ArgumentsHost) {
        this.logger.error(e);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        // const request = ctx.getRequest();
        const status =
            e instanceof HttpException
                ? e.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        let body = e;
        if (e instanceof Error) {body = e.stack;}
        if (e instanceof BadRequestException) {
            body = { errorCode: e.message, message: e.name, stack: e.stack };
        }

        response.status(status).json(body);
    }
}
