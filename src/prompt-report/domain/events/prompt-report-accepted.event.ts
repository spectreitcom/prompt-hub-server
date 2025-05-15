import { IEvent } from '@nestjs/cqrs';
import { PromptReportId } from '../value-objects';
import { PromptId } from '../../../prompt-hub/domain/value-objects';

export class PromptReportAcceptedEvent implements IEvent {
  constructor(
    public readonly reportId: PromptReportId,
    public readonly promptId: PromptId,
  ) {}
}
