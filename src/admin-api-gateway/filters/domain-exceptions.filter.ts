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
import {
  TagNotFoundException,
  TagAlreadyExistsException,
  TagIdValidationException,
  TagValueContentException,
  TagValueLengthException,
} from '../../tags';
import {
  AdminUserIdEmptyException,
  AdminUserIdInvalidException,
  EmailAddressInvalidException as AdminEmailAddressInvalidException,
  PasswordHashEmptyException,
} from '../../admin-users/domain';
import {
  AvatarUrlInvalidException,
  EmailAddressEmptyException,
  EmailAddressInvalidException,
  GoogleIdEmptyException,
  PersonNameEmptyException,
  PersonNameTooLongException,
  PersonNameTooShortException,
  ProviderEmptyException,
  ProviderInvalidException,
  UserIdEmptyException,
  UserIdInvalidException,
  UserNameEmptyException,
  UserNameTooLongException,
  UserNameTooShortException,
  ValidationException,
} from '../../accounts';

@Catch(
  // Prompt Hub exceptions
  PromptHubException,
  // Prompt Report exceptions
  PromptReportException,
  // Favorites exceptions
  FavoritesException,
  // Notifications exceptions
  NotificationsException,
  // Tags exceptions
  TagNotFoundException,
  TagAlreadyExistsException,
  TagIdValidationException,
  TagValueContentException,
  TagValueLengthException,
  // Admin Users exceptions
  AdminUserIdEmptyException,
  AdminUserIdInvalidException,
  AdminEmailAddressInvalidException,
  PasswordHashEmptyException,
  // Accounts exceptions
  AvatarUrlInvalidException,
  EmailAddressEmptyException,
  EmailAddressInvalidException,
  GoogleIdEmptyException,
  PersonNameEmptyException,
  PersonNameTooLongException,
  PersonNameTooShortException,
  ProviderEmptyException,
  ProviderInvalidException,
  UserIdEmptyException,
  UserIdInvalidException,
  UserNameEmptyException,
  UserNameTooLongException,
  UserNameTooShortException,
  ValidationException,
  // Generic Error
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

    // Handle PromptHub exceptions
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
    }
    // Handle PromptReport exceptions
    else if (exception instanceof PromptReportException) {
      if (exception.message.includes('not found')) {
        status = HttpStatus.NOT_FOUND;
        error = 'Not Found';
      } else {
        status = HttpStatus.BAD_REQUEST;
        error = 'Bad Request';
      }
    }
    // Handle Favorites exceptions
    else if (exception instanceof FavoritesException) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Bad Request';
    }
    // Handle Notifications exceptions
    else if (exception instanceof NotificationsException) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Bad Request';
    }
    // Handle Tags exceptions
    else if (
      exception instanceof TagNotFoundException ||
      exception.name === 'TagNotFoundException'
    ) {
      status = HttpStatus.NOT_FOUND;
      error = 'Not Found';
    } else if (
      exception instanceof TagAlreadyExistsException ||
      exception instanceof TagIdValidationException ||
      exception instanceof TagValueContentException ||
      exception instanceof TagValueLengthException
    ) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Bad Request';
    }
    // Handle Admin Users exceptions
    else if (
      exception instanceof AdminUserIdEmptyException ||
      exception instanceof AdminUserIdInvalidException ||
      exception instanceof AdminEmailAddressInvalidException ||
      exception instanceof PasswordHashEmptyException
    ) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Bad Request';
    }
    // Handle Accounts exceptions
    else if (
      exception instanceof AvatarUrlInvalidException ||
      exception instanceof EmailAddressEmptyException ||
      exception instanceof EmailAddressInvalidException ||
      exception instanceof GoogleIdEmptyException ||
      exception instanceof PersonNameEmptyException ||
      exception instanceof PersonNameTooLongException ||
      exception instanceof PersonNameTooShortException ||
      exception instanceof ProviderEmptyException ||
      exception instanceof ProviderInvalidException ||
      exception instanceof UserIdEmptyException ||
      exception instanceof UserIdInvalidException ||
      exception instanceof UserNameEmptyException ||
      exception instanceof UserNameTooLongException ||
      exception instanceof UserNameTooShortException ||
      exception instanceof ValidationException
    ) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Bad Request';
    }
    // Handle validation errors
    else if (exception.name === 'ValidationError') {
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
