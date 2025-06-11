import {
  IsEmail,
  IsNotEmpty,
  validateSync,
  ValidationError,
} from 'class-validator';
import {
  EmailAddressEmptyException,
  EmailAddressInvalidException,
  ValidationException,
} from '../exceptions';

export class EmailAddress {
  @IsNotEmpty({ message: 'Email address cannot be empty.' })
  @IsEmail({}, { message: 'Invalid email address format.' })
  private readonly value: string;

  private constructor(email: string) {
    this.value = email.trim().toLowerCase();
    this.validate();
  }

  static create(email: string): EmailAddress {
    return new EmailAddress(email);
  }

  private validate(): void {
    const errors: ValidationError[] = validateSync(this);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints).join(', '))
        .join(', ');

      if (errorMessages.includes('cannot be empty')) {
        throw new EmailAddressEmptyException();
      }

      if (errorMessages.includes('Invalid email address format')) {
        throw new EmailAddressInvalidException();
      }

      // Fallback for any other validation errors
      throw new ValidationException(errorMessages);
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: EmailAddress): boolean {
    return this.value === other.getValue();
  }
}
