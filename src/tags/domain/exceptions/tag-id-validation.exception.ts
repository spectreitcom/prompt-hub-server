import { ValidationError } from 'class-validator';

export class TagIdValidationException extends Error {
  constructor(errors: ValidationError[]) {
    const message = errors
      .map((error) => Object.values(error.constraints).join(', '))
      .join(', ');
    super(message);
    this.name = 'TagIdValidationException';
  }
}
