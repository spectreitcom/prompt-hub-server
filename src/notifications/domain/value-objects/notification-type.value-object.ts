import { isString } from 'class-validator';
import {
  NotificationTypeEmptyException,
  NotificationTypeInvalidException,
} from '../exceptions';

export class NotificationType {
  static readonly SIMPLE_INFO = 'SIMPLE_INFO';

  // List of all valid notification types
  private static readonly VALID_TYPES = [NotificationType.SIMPLE_INFO];

  private constructor(private readonly value: string) {}

  static create(type: string): NotificationType {
    if (!type || !isString(type) || type.trim() === '') {
      throw new NotificationTypeEmptyException();
    }

    const normalizedType = type.trim().toUpperCase();

    if (!NotificationType.VALID_TYPES.includes(normalizedType)) {
      throw new NotificationTypeInvalidException(NotificationType.VALID_TYPES);
    }

    return new NotificationType(normalizedType);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: NotificationType): boolean {
    return this.value === other.getValue();
  }

  isSimpleInfo(): boolean {
    return this.value === NotificationType.SIMPLE_INFO;
  }
}
