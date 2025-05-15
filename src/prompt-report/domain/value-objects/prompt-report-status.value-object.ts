import { PromptReportStatus as PromptReportStatusType } from '@prisma/client';

export class PromptReportStatus {
  private constructor(private readonly value: PromptReportStatusType) {}

  static pending() {
    return new PromptReportStatus(PromptReportStatusType.PENDING);
  }

  static accepted() {
    return new PromptReportStatus(PromptReportStatusType.ACCEPTED);
  }

  static rejected() {
    return new PromptReportStatus(PromptReportStatusType.REJECTED);
  }

  isPending() {
    return this.value === PromptReportStatusType.PENDING;
  }

  isAccepted() {
    return this.value === PromptReportStatusType.ACCEPTED;
  }

  isRejected() {
    return this.value === PromptReportStatusType.REJECTED;
  }

  getValue(): PromptReportStatusType {
    return this.value;
  }

  equals(other: PromptReportStatus): boolean {
    return this.value === other.getValue();
  }
}
