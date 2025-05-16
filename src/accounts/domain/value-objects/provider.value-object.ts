import {
  IsNotEmpty,
  IsIn,
  validateSync,
  ValidationError,
} from 'class-validator';

export class Provider {
  @IsNotEmpty({ message: 'Provider cannot be empty.' })
  @IsIn(['google'], {
    message: 'Invalid provider. Currently only "google" is supported.',
  })
  private readonly value: string;

  private constructor(provider: string) {
    this.value = provider.trim().toLowerCase();
    this.validate();
  }

  static create(provider: string): Provider {
    return new Provider(provider);
  }

  static google() {
    return new Provider('google');
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

  isGoogle(): boolean {
    return this.value === 'google';
  }

  equals(other: Provider): boolean {
    return this.value === other.getValue();
  }
}
