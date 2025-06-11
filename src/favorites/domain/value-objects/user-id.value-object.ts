import { isUUID } from 'class-validator';
import { FavoriteValidationException } from '../exceptions';

export class UserId {
  private constructor(private readonly value: string) {}

  static create(id: string): UserId {
    if (!id || id.trim() === '') {
      throw new FavoriteValidationException('User ID cannot be empty.');
    }

    const trimmedId = id.trim();
    if (!isUUID(trimmedId, '4')) {
      throw new FavoriteValidationException('User ID must be a valid UUID.');
    }

    return new UserId(trimmedId);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.getValue();
  }
}
