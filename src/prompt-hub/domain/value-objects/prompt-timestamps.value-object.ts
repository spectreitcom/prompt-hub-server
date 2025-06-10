import { PromptValidationException } from '../exceptions';

export class PromptTimestamps {
  private constructor(
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  static create(createdAt: Date, updatedAt: Date): PromptTimestamps {
    if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
      throw new PromptValidationException('Created at must be a valid date.');
    }

    if (!(updatedAt instanceof Date) || isNaN(updatedAt.getTime())) {
      throw new PromptValidationException('Updated at must be a valid date.');
    }

    if (updatedAt < createdAt) {
      throw new PromptValidationException(
        'Updated at cannot be earlier than created at.',
      );
    }

    return new PromptTimestamps(createdAt, updatedAt);
  }

  static createNew(): PromptTimestamps {
    const now = new Date();
    return new PromptTimestamps(now, now);
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }

  withUpdatedAt(updatedAt: Date): PromptTimestamps {
    if (!(updatedAt instanceof Date) || isNaN(updatedAt.getTime())) {
      throw new PromptValidationException('Updated at must be a valid date.');
    }

    if (updatedAt < this.createdAt) {
      throw new PromptValidationException(
        'Updated at cannot be earlier than created at.',
      );
    }

    return new PromptTimestamps(this.createdAt, updatedAt);
  }

  equals(other: PromptTimestamps): boolean {
    return (
      this.createdAt.getTime() === other.getCreatedAt().getTime() &&
      this.updatedAt.getTime() === other.getUpdatedAt().getTime()
    );
  }
}
