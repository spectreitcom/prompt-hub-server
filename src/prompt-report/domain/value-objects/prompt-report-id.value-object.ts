import { isUUID } from 'class-validator';

export class PromptReportId {
  private constructor(private readonly value: string) {}

  static create(id: string): PromptReportId {
    if (!id || id.trim() === '') {
      throw new Error('Prompt Report ID cannot be empty.');
    }

    if (!isUUID(id, '4')) {
      throw new Error('Prompt Report ID must be a valid UUID.');
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
