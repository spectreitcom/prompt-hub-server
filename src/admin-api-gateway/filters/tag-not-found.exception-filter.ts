import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { TagNotFoundException } from '../../tags/domain';

@Catch(TagNotFoundException)
export class TagNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: TagNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(404).json({
      statusCode: 404,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
