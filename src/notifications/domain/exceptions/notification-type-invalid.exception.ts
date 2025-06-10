import { NotificationsException } from './notifications.exception';

export class NotificationTypeInvalidException extends NotificationsException {
  constructor(validTypes: string[]) {
    super(
      `Invalid notification type. Valid types are: ${validTypes.join(', ')}`,
    );
  }
}
