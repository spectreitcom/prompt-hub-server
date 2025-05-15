import { IEvent } from '@nestjs/cqrs';
import { PromptReportId, PromptReportReason } from '../value-objects';
import { PromptId, UserId } from '../../../prompt-hub/domain/value-objects';

export class PromptReportCreatedEvent implements IEvent {
  constructor(
    public readonly reportId: PromptReportId,
    public readonly promptId: PromptId,
    public readonly reporterId: UserId,
    public readonly reason: PromptReportReason,
  ) {}
}
