import { IsNotEmpty } from 'class-validator';

export class PasswordHash {
  @IsNotEmpty({ message: 'Password hash cannot be empty.' })
  private readonly value: string;

  private constructor(passwordHash: string) {
    if (!passwordHash || passwordHash.trim() === '') {
      throw new Error('Password hash cannot be empty.');
    }
    this.value = passwordHash;
  }

  static create(passwordHash: string): PasswordHash {
    return new PasswordHash(passwordHash);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PasswordHash): boolean {
    return this.value === other.getValue();
  }
}
