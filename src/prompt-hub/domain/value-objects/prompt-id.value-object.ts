import { isUUID } from 'class-validator';
import { PromptValidationException } from '../exceptions';

export class PromptId {
  private constructor(private readonly value: string) {}

  static create(id: string): PromptId {
    if (!id || id.trim() === '') {
      throw new PromptValidationException('Prompt ID cannot be empty.');
    }

    if (!isUUID(id, '4')) {
      throw new PromptValidationException('Prompt ID must be a valid UUID.');
    }

    return new PromptId(id.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PromptId): boolean {
    return this.value === other.getValue();
  }
}
