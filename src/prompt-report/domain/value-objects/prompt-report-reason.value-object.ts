import { PromptReportReasonInvalidException } from '../exceptions';

export class PromptReportReason {
  private constructor(private readonly value: string) {}

  static create(value: string): PromptReportReason {
    const trimmed = value.trim();
    if (trimmed.length < 5 || trimmed.length > 500) {
      throw new PromptReportReasonInvalidException();
    }
    return new PromptReportReason(trimmed);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PromptReportReason): boolean {
    return this.value === other.getValue();
  }
}
