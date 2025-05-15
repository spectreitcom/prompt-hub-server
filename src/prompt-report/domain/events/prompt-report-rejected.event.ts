import { IEvent } from '@nestjs/cqrs';
import { PromptReportId } from '../value-objects';

export class PromptReportRejectedEvent implements IEvent {
  constructor(public readonly reportId: PromptReportId) {}
}
