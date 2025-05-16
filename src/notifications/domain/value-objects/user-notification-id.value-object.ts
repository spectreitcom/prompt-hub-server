import { isUUID } from 'class-validator';

export class NotificationId {
  private constructor(private readonly value: string) {}

  static create(id: string): NotificationId {
    if (!id || id.trim() === '') {
      throw new Error('Notification ID cannot be empty.');
    }

    if (!isUUID(id, '4')) {
      throw new Error('Notification ID must be a valid UUID.');
    }

    return new NotificationId(id.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: NotificationId): boolean {
    return this.value === other.getValue();
  }
}
