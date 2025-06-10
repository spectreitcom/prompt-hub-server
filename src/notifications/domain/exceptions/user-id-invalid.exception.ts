import { NotificationsException } from './notifications.exception';

export class UserIdInvalidException extends NotificationsException {
  constructor() {
    super('User ID must be a valid UUID.');
  }
}
