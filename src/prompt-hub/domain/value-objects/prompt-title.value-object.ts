import { PromptValidationException } from '../exceptions';

export class PromptTitle {
  private constructor(private readonly value: string) {}

  static create(raw: string): PromptTitle {
    const trimmed = raw.trim();

    if (trimmed.length < 3 || trimmed.length > 100) {
      throw new PromptValidationException(
        'Prompt title must be between 3 and 100 characters.',
      );
    }

    return new PromptTitle(trimmed);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PromptTitle): boolean {
    return this.value === other.getValue();
  }
}
