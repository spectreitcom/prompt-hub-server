import { isUUID } from 'class-validator';
import {
  PromptVoteIdEmptyException,
  PromptVoteIdInvalidException,
} from '../exceptions';

export class PromptVoteId {
  private constructor(private readonly value: string) {}

  static create(id: string): PromptVoteId {
    if (!id || id.trim() === '') {
      throw new PromptVoteIdEmptyException();
    }

    if (!isUUID(id, '4')) {
      throw new PromptVoteIdInvalidException();
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
