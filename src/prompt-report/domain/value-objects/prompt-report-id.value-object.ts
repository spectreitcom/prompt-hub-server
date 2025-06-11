import { isUUID } from 'class-validator';
import {
  PromptReportIdEmptyException,
  PromptReportIdInvalidException,
} from '../exceptions';

export class PromptReportId {
  private constructor(private readonly value: string) {}

  static create(id: string): PromptReportId {
    if (!id || id.trim() === '') {
      throw new PromptReportIdEmptyException();
    }

    if (!isUUID(id, '4')) {
      throw new PromptReportIdInvalidException();
    }

    return new PromptReportId(id.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PromptReportId): boolean {
    return this.value === other.getValue();
  }
}
