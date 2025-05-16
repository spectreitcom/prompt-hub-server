import { isEmail } from 'class-validator';

export class EmailAddress {
  private constructor(private readonly value: string) {}

  static create(email: string): EmailAddress {
    if (!email || email.trim() === '') {
      throw new Error('Email address cannot be empty.');
    }

    if (!isEmail(email.trim())) {
      throw new Error('Invalid email address format.');
    }

    return new EmailAddress(email.trim().toLowerCase());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: EmailAddress): boolean {
    return this.value === other.getValue();
  }
}
