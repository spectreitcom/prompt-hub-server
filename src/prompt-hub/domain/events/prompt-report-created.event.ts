import { IEvent } from '@nestjs/cqrs';
import {
  PromptId,
  PromptReportId,
  PromptReportReason,
  UserId,
} from '../value-objects';

export class PromptReportCreatedEvent implements IEvent {
  constructor(
    public readonly reportId: PromptReportId,
    public readonly promptId: PromptId,
    public readonly reporterId: UserId,
    public readonly reason: PromptReportReason,
  ) {}
}
