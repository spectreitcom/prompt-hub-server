import {
  IsNotEmpty,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';

export class TagId {
  @IsNotEmpty({ message: 'Tag ID cannot be empty.' })
  @IsString({ message: 'Tag ID must be a string.' })
  private readonly value: string;

  private constructor(id: string) {
    this.value = id.trim();
    this.validate();
  }

  static create(id: string): TagId {
    return new TagId(id);
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

  equals(other: TagId): boolean {
    return this.value === other.getValue();
  }
}