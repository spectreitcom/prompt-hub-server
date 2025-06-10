import { isUUID } from 'class-validator';
import {
  NotificationIdEmptyException,
  NotificationIdInvalidException,
} from '../exceptions';

export class UserNotificationId {
  private constructor(private readonly value: string) {}

  static create(id: string): UserNotificationId {
    if (!id || id.trim() === '') {
      throw new NotificationIdEmptyException();
    }

    if (!isUUID(id, '4')) {
      throw new NotificationIdInvalidException();
    }

    return new UserNotificationId(id.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserNotificationId): boolean {
    return this.value === other.getValue();
  }
}
