import { isUUID } from 'class-validator';
import { UserIdEmptyException, UserIdInvalidException } from '../exceptions';

export class UserId {
  private constructor(private readonly value: string) {}

  static create(id: string): UserId {
    if (!id || id.trim() === '') {
      throw new UserIdEmptyException();
    }

    if (!isUUID(id, '4')) {
      throw new UserIdInvalidException();
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
