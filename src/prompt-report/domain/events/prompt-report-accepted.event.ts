import { IEvent } from '@nestjs/cqrs';
import { PromptId, PromptReportId } from '../value-objects';

export class PromptReportAcceptedEvent implements IEvent {
  constructor(
    public readonly reportId: PromptReportId,
    public readonly promptId: PromptId,
  ) {}
}
