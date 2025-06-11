import { isUUID } from 'class-validator';
import {
  PromptIdEmptyException,
  PromptIdInvalidException,
} from '../exceptions';

export class PromptId {
  private constructor(private readonly value: string) {}

  static create(id: string): PromptId {
    if (!id || id.trim() === '') {
      throw new PromptIdEmptyException();
    }

    if (!isUUID(id, '4')) {
      throw new PromptIdInvalidException();
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
