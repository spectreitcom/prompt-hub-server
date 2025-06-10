import {
  IsEmail,
  IsNotEmpty,
  validateSync,
  ValidationError,
} from 'class-validator';
import { EmailAddressInvalidException } from '../exceptions';

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
      throw new EmailAddressInvalidException(
        errors
          .map((error) => Object.values(error.constraints).join(', '))
          .join(', '),
      );
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: EmailAddress): boolean {
    return this.value === other.getValue();
  }
}
