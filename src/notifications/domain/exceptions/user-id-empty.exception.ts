import { NotificationsException } from './notifications.exception';

export class UserIdEmptyException extends NotificationsException {
  constructor() {
    super('User ID cannot be empty.');
  }
}
