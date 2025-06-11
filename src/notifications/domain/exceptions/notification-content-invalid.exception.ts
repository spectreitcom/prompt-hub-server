import { NotificationsException } from './notifications.exception';

export class NotificationContentInvalidException extends NotificationsException {
  constructor() {
    super('Notification content must be a non-empty string if provided.');
  }
}
