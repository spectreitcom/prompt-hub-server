import { isString } from 'class-validator';
import {
  NotificationTitleEmptyException,
  NotificationContentInvalidException,
} from '../exceptions';

export class NotificationPayload {
  private constructor(
    private readonly title: string,
    private readonly content?: string,
  ) {}

  static create(title: string, content?: string): NotificationPayload {
    if (!title || !isString(title) || title.trim() === '') {
      throw new NotificationTitleEmptyException();
    }

    // Content is optional, but if provided, it must be a string
    if (
      content !== undefined &&
      (!isString(content) || content.trim() === '')
    ) {
      throw new NotificationContentInvalidException();
    }

    return new NotificationPayload(
      title.trim(),
      content ? content.trim() : undefined,
    );
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string | undefined {
    return this.content;
  }

  hasContent(): boolean {
    return this.content !== undefined;
  }

  equals(other: NotificationPayload): boolean {
    return (
      this.title === other.getTitle() && this.content === other.getContent()
    );
  }

  toObject() {
    return {
      title: this.title,
      content: this.content,
    };
  }
}
