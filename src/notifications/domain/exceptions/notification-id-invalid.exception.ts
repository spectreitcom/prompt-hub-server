import { NotificationsException } from './notifications.exception';

export class NotificationIdInvalidException extends NotificationsException {
  constructor() {
    super('Notification ID must be a valid UUID.');
  }
}
