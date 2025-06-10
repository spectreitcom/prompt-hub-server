import { NotificationsException } from './notifications.exception';

export class NotificationIdEmptyException extends NotificationsException {
  constructor() {
    super('Notification ID cannot be empty.');
  }
}
