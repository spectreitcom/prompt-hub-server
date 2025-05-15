import { isUUID } from 'class-validator';

export class PromptId {
  private constructor(private readonly value: string) {}

  static create(id: string): PromptId {
    if (!id || id.trim() === '') {
      throw new Error('Prompt ID cannot be empty.');
    }

    if (!isUUID(id, '4')) {
      throw new Error('Prompt ID must be a valid UUID.');
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
