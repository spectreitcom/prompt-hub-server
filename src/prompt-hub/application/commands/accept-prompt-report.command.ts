import { ICommand } from '@nestjs/cqrs';

export class AcceptPromptReportCommand implements ICommand {
  constructor(public readonly reportId: string) {}
}
