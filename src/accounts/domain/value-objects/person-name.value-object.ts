import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  validateSync,
  ValidationError,
} from 'class-validator';

export class PersonName {
  @IsNotEmpty({ message: 'Person name cannot be empty.' })
  @MinLength(2, { message: 'Person name must be at least 2 characters long.' })
  @MaxLength(100, { message: 'Person name cannot exceed 100 characters.' })
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'Person name can only contain letters, spaces, hyphens, and apostrophes.',
  })
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

  equals(other: PersonName): boolean {
    return this.value === other.getValue();
  }
}
