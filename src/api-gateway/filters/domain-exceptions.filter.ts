import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { PromptHubException } from '../../prompt-hub';
import { PromptReportException } from '../../prompt-report';
import { FavoritesException } from '../../favorites';
import { NotificationsException } from '../../notifications';
import { TagNotFoundException } from '../../tags';

@Catch(
  PromptHubException,
  PromptReportException,
  FavoritesException,
  NotificationsException,
  TagNotFoundException,
  Error,
)
export class DomainExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionsFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(
      `Exception caught: ${exception.message}`,
      exception.stack,
    );

    // Determine HTTP status based on exception type
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';

    if (exception instanceof PromptHubException) {
      if (exception.message.includes('not found')) {
        status = HttpStatus.NOT_FOUND;
        error = 'Not Found';
      } else if (exception.message.includes('unauthorized')) {
        status = HttpStatus.FORBIDDEN;
        error = 'Forbidden';
      } else {
        status = HttpStatus.BAD_REQUEST;
        error = 'Bad Request';
      }
    } else if (exception instanceof PromptReportException) {
      if (exception.message.includes('not found')) {
        status = HttpStatus.NOT_FOUND;
        error = 'Not Found';
      } else {
        status = HttpStatus.BAD_REQUEST;
        error = 'Bad Request';
      }
    } else if (exception instanceof FavoritesException) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Bad Request';
    } else if (exception instanceof NotificationsException) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Bad Request';
    } else if (exception instanceof TagNotFoundException) {
      status = HttpStatus.NOT_FOUND;
      error = 'Not Found';
    } else if (exception.name === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      error = 'Validation Error';
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error,
    });
  }
}
