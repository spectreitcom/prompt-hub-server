import { ICommand } from '@nestjs/cqrs';

export class RejectPromptReportCommand implements ICommand {
  constructor(public readonly reportId: string) {}
}
