import { isUUID } from 'class-validator';

export class PromptVoteId {
  private constructor(private readonly value: string) {}

  static create(id: string): PromptVoteId {
    if (!id || id.trim() === '') {
      throw new Error('Prompt Vote ID cannot be empty.');
    }

    if (!isUUID(id, '4')) {
      throw new Error('Prompt Vote ID must be a valid UUID.');
    }

    return new PromptVoteId(id.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PromptVoteId): boolean {
    return this.value === other.getValue();
  }
}
