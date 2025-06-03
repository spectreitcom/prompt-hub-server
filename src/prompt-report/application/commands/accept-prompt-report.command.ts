import { ICommand } from '@nestjs/cqrs';
import { PromptReportId } from '../../domain';

export class AcceptPromptReportCommand implements ICommand {
  constructor(public readonly reportId: PromptReportId) {}
}
