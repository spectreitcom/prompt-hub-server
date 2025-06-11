import {
  IsNotEmpty,
  IsUUID,
  validateSync,
  ValidationError,
} from 'class-validator';
import {
  UserIdEmptyException,
  UserIdInvalidException,
  ValidationException,
} from '../exceptions';

export class UserId {
  @IsNotEmpty({ message: 'User ID cannot be empty.' })
  @IsUUID('4', { message: 'User ID must be a valid UUID.' })
  private readonly value: string;

  private constructor(id: string) {
    this.value = id.trim();
    this.validate();
  }

  static create(id: string): UserId {
    return new UserId(id);
  }

  private validate(): void {
    const errors: ValidationError[] = validateSync(this);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints).join(', '))
        .join(', ');

      if (errorMessages.includes('cannot be empty')) {
        throw new UserIdEmptyException();
      }

      if (errorMessages.includes('must be a valid UUID')) {
        throw new UserIdInvalidException();
      }

      // Fallback for any other validation errors
      throw new ValidationException(errorMessages);
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.getValue();
  }
}
