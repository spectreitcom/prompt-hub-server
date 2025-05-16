import {
  IsNotEmpty,
  IsUUID,
  validateSync,
  ValidationError,
} from 'class-validator';

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

  equals(other: UserId): boolean {
    return this.value === other.getValue();
  }
}
