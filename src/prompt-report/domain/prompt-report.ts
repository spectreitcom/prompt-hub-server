import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import {
  PromptId,
  PromptReportId,
  PromptReportReason,
  PromptReportStatus,
  UserId,
} from './value-objects';
import {
  PromptReportAcceptedEvent,
  PromptReportCreatedEvent,
  PromptReportRejectedEvent,
} from './events';

export class PromptReport extends AggregateRoot {
  private readonly id: PromptReportId;
  private readonly promptId: PromptId;
  private readonly reporterId: UserId;
  private readonly reason: PromptReportReason;
  private status: PromptReportStatus;
  private readonly createdAt: Date;

  constructor(
    id: PromptReportId,
    promptId: PromptId,
    reporterId: UserId,
    reason: PromptReportReason,
    status: PromptReportStatus,
    createdAt: Date,
  ) {
    super();
    this.id = id;
    this.promptId = promptId;
    this.reporterId = reporterId;
    this.reason = reason;
    this.status = status;
    this.createdAt = createdAt;
  }

  static create(
    promptId: PromptId,
    reporterId: UserId,
    reason: PromptReportReason,
  ): PromptReport {
    const report = new PromptReport(
      PromptReportId.create(randomUUID()),
      promptId,
      reporterId,
      reason,
      PromptReportStatus.pending(),
      new Date(),
    );

    report.apply(
      new PromptReportCreatedEvent(
        report.id,
        report.promptId,
        report.reporterId,
        report.reason,
      ),
    );

    return report;
  }

  accept(): void {
    if (!this.isPending()) {
      throw new Error('Only pending reports can be accepted');
    }

    this.status = PromptReportStatus.accepted();
    this.apply(new PromptReportAcceptedEvent(this.id, this.promptId));
  }

  reject(): void {
    if (!this.isPending()) {
      throw new Error('Only pending reports can be rejected');
    }

    this.status = PromptReportStatus.rejected();
    this.apply(new PromptReportRejectedEvent(this.id));
  }

  isPending(): boolean {
    return this.status.isPending();
  }

  isAccepted(): boolean {
    return this.status.isAccepted();
  }

  isRejected(): boolean {
    return this.status.isRejected();
  }

  getId(): PromptReportId {
    return this.id;
  }

  getPromptId(): PromptId {
    return this.promptId;
  }

  getReporterId(): UserId {
    return this.reporterId;
  }

  getReason(): PromptReportReason {
    return this.reason;
  }

  getStatus(): PromptReportStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
