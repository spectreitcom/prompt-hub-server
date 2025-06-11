import { PromptValidationException } from '../exceptions';

export class PromptInstruction {
  private constructor(private readonly value: string | null) {}

  static create(raw: string | null): PromptInstruction {
    if (raw === null) {
      return new PromptInstruction(null);
    }

    const normalized = raw.trim();

    if (normalized.length > 1000) {
      throw new PromptValidationException('Prompt instruction is too long.');
    }

    return new PromptInstruction(normalized.length === 0 ? null : normalized);
  }

  getValue(): string | null {
    return this.value;
  }

  equals(other: PromptInstruction): boolean {
    return this.value === other.getValue();
  }
}
