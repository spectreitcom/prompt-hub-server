import { isString } from 'class-validator';

export class NotificationType {
  static readonly SIMPLE_INFO = 'SIMPLE_INFO';

  // List of all valid notification types
  private static readonly VALID_TYPES = [NotificationType.SIMPLE_INFO];

  private constructor(private readonly value: string) {}

  static create(type: string): NotificationType {
    if (!type || !isString(type) || type.trim() === '') {
      throw new Error('Notification type cannot be empty.');
    }

    const normalizedType = type.trim().toUpperCase();

    if (!NotificationType.VALID_TYPES.includes(normalizedType)) {
      throw new Error(
        `Invalid notification type. Valid types are: ${NotificationType.VALID_TYPES.join(
          ', ',
        )}`,
      );
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
