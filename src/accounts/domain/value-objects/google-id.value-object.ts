import { IsNotEmpty, validateSync, ValidationError } from 'class-validator';

export class GoogleId {
  @IsNotEmpty({ message: 'GoogleId cannot be empty.' })
  private readonly value: string;

  private constructor(value: string) {
    this.value = value.trim();
    this.validate();
  }

  static create(googleId: string): GoogleId {
    return new GoogleId(googleId);
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

  equals(other: GoogleId): boolean {
    return this.value === other.getValue();
  }
}
