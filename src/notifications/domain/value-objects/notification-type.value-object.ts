import { isString } from 'class-validator';

export class NotificationType {
  // Define example notification types
  static readonly PROMPT_PUBLISHED = 'PROMPT_PUBLISHED';
  static readonly PROMPT_LIKED = 'PROMPT_LIKED';
  static readonly PROMPT_COMMENTED = 'PROMPT_COMMENTED';
  static readonly PROMPT_REPORTED = 'PROMPT_REPORTED';
  static readonly USER_MENTIONED = 'USER_MENTIONED';

  // List of all valid notification types
  private static readonly VALID_TYPES = [
    NotificationType.PROMPT_PUBLISHED,
    NotificationType.PROMPT_LIKED,
    NotificationType.PROMPT_COMMENTED,
    NotificationType.PROMPT_REPORTED,
    NotificationType.USER_MENTIONED,
  ];

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

  isPromptPublished(): boolean {
    return this.value === NotificationType.PROMPT_PUBLISHED;
  }

  isPromptLiked(): boolean {
    return this.value === NotificationType.PROMPT_LIKED;
  }

  isPromptCommented(): boolean {
    return this.value === NotificationType.PROMPT_COMMENTED;
  }

  isPromptReported(): boolean {
    return this.value === NotificationType.PROMPT_REPORTED;
  }

  isUserMentioned(): boolean {
    return this.value === NotificationType.USER_MENTIONED;
  }
}
