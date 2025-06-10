import { isUUID } from 'class-validator';
import { FavoriteValidationException } from '../exceptions';

export class FavoritePromptId {
  private constructor(private readonly value: string) {}

  static create(id: string): FavoritePromptId {
    if (!id || id.trim() === '') {
      throw new FavoriteValidationException('Favorite Prompt ID cannot be empty.');
    }

    const trimmedId = id.trim();
    if (!isUUID(trimmedId, '4')) {
      throw new FavoriteValidationException('Favorite Prompt ID must be a valid UUID.');
    }

    return new FavoritePromptId(trimmedId);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: FavoritePromptId): boolean {
    return this.value === other.getValue();
  }
}
