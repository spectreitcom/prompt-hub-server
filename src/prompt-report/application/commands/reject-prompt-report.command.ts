import { ICommand } from '@nestjs/cqrs';
import { PromptReportId } from '../../domain';

export class RejectPromptReportCommand implements ICommand {
  constructor(public readonly reportId: PromptReportId) {}
}
