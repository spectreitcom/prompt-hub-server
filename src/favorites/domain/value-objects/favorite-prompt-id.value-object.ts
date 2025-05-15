import { isUUID } from 'class-validator';

export class FavoritePromptId {
  private constructor(private readonly value: string) {}

  static create(id: string): FavoritePromptId {
    if (!id || id.trim() === '') {
      throw new Error('Favorite Prompt ID cannot be empty.');
    }

    if (!isUUID(id, '4')) {
      throw new Error('Favorite Prompt ID must be a valid UUID.');
    }

    return new FavoritePromptId(id.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: FavoritePromptId): boolean {
    return this.value === other.getValue();
  }
}
