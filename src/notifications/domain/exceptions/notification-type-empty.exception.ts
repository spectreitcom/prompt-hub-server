import { NotificationsException } from './notifications.exception';

export class NotificationTypeEmptyException extends NotificationsException {
  constructor() {
    super('Notification type cannot be empty.');
  }
}
