import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  validateSync,
  ValidationError,
} from 'class-validator';

export class UserName {
  @IsNotEmpty({ message: 'Username cannot be empty.' })
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @MaxLength(50, { message: 'Username cannot exceed 50 characters.' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Username can only contain letters, numbers, underscores, and hyphens.',
  })
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
      throw new Error(
        errors
          .map((error) => Object.values(error.constraints).join(', '))
          .join(', '),
      );
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserName): boolean {
    return this.value === other.getValue();
  }
}
