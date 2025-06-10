import { IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { PasswordHashEmptyException } from '../exceptions';

export class PasswordHash {
  @IsNotEmpty({ message: 'Password hash cannot be empty.' })
  private readonly value: string;

  private constructor(passwordHash: string) {
    if (!passwordHash || passwordHash.trim() === '') {
      throw new PasswordHashEmptyException();
    }
    this.value = passwordHash;
  }

  static create(password: string): PasswordHash {
    // Hash the password using bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return new PasswordHash(hashedPassword);
  }

  static createFromHash(passwordHash: string): PasswordHash {
    return new PasswordHash(passwordHash);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PasswordHash): boolean {
    return this.value === other.getValue();
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.value);
  }
}
