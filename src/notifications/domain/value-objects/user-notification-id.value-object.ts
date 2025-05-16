import { isUUID } from 'class-validator';

export class UserNotificationId {
  private constructor(private readonly value: string) {}

  static create(id: string): UserNotificationId {
    if (!id || id.trim() === '') {
      throw new Error('Notification ID cannot be empty.');
    }

    if (!isUUID(id, '4')) {
      throw new Error('Notification ID must be a valid UUID.');
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
