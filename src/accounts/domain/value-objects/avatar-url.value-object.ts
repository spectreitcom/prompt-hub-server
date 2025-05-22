import {
  IsUrl,
  ValidateIf,
  validateSync,
  ValidationError,
} from 'class-validator';

export class AvatarUrl {
  @ValidateIf((o) => o.value !== '')
  @IsUrl(
    {
      protocols: ['http', 'https'],
      require_protocol: true,
    },
    { message: 'Avatar URL must be a valid HTTP or HTTPS URL.' },
  )
  @ValidateIf((o) => o.value !== '')
  private readonly value: string;

  private constructor(url: string) {
    this.value = url ? url.trim() : '';
    this.validate();
  }

  static create(url: string): AvatarUrl {
    return new AvatarUrl(url);
  }

  private validate(): void {
    // Skip validation for empty values
    if (this.value === '') {
      return;
    }

    // Validate URL format using class-validator
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

  isEmpty(): boolean {
    return this.value === '';
  }

  equals(other: AvatarUrl): boolean {
    return this.value === other.getValue();
  }
}
