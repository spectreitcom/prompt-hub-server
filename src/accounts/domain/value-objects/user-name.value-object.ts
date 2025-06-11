import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  validateSync,
  ValidationError,
} from 'class-validator';
import {
  UserNameEmptyException,
  UserNameTooShortException,
  UserNameTooLongException,
  ValidationException,
} from '../exceptions';

export class UserName {
  @IsNotEmpty({ message: 'Username cannot be empty.' })
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @MaxLength(50, { message: 'Username cannot exceed 50 characters.' })
  private readonly value: string;

  private constructor(userName: string) {
    this.value = userName.trim();
    this.validate();
  }

  static create(userName: string): UserName {
    return new UserName(userName);
  }

  private validate(): void {
    const errors: ValidationError[] = validateSync(this);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints).join(', '))
        .join(', ');

      if (errorMessages.includes('cannot be empty')) {
        throw new UserNameEmptyException();
      }

      if (errorMessages.includes('must be at least 3 characters long')) {
        throw new UserNameTooShortException();
      }

      if (errorMessages.includes('cannot exceed 50 characters')) {
        throw new UserNameTooLongException();
      }

      // Fallback for any other validation errors
      throw new ValidationException(errorMessages);
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserName): boolean {
    return this.value === other.getValue();
  }
}
