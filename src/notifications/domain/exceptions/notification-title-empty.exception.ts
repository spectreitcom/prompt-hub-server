import { NotificationsException } from './notifications.exception';

export class NotificationTitleEmptyException extends NotificationsException {
  constructor() {
    super('Notification title cannot be empty.');
  }
}
