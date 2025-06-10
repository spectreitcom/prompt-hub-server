import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  validateSync,
  ValidationError,
} from 'class-validator';
import {
  PersonNameEmptyException,
  PersonNameTooShortException,
  PersonNameTooLongException,
  ValidationException,
} from '../exceptions';

export class PersonName {
  @IsNotEmpty({ message: 'Person name cannot be empty.' })
  @MinLength(2, { message: 'Person name must be at least 2 characters long.' })
  @MaxLength(100, { message: 'Person name cannot exceed 100 characters.' })
  private readonly value: string;

  private constructor(name: string) {
    this.value = name.trim();
    this.validate();
  }

  static create(name: string): PersonName {
    return new PersonName(name);
  }

  private validate(): void {
    const errors: ValidationError[] = validateSync(this);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints).join(', '))
        .join(', ');

      if (errorMessages.includes('cannot be empty')) {
        throw new PersonNameEmptyException();
      }

      if (errorMessages.includes('must be at least 2 characters long')) {
        throw new PersonNameTooShortException();
      }

      if (errorMessages.includes('cannot exceed 100 characters')) {
        throw new PersonNameTooLongException();
      }

      // Fallback for any other validation errors
      throw new ValidationException(errorMessages);
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PersonName): boolean {
    return this.value === other.getValue();
  }
}
