import { isUUID } from 'class-validator';
import { UserValidationException } from '../exceptions';

export class UserId {
  private constructor(private readonly value: string) {}

  static create(id: string): UserId {
    if (!id || id.trim() === '') {
      throw new UserValidationException('User ID cannot be empty.');
    }

    if (!isUUID(id, '4')) {
      throw new UserValidationException('User ID must be a valid UUID.');
    }

    return new UserId(id.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.getValue();
  }
}
