import { ICommand } from '@nestjs/cqrs';

export class CreatePromptReportCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly reporterId: string,
    public readonly reason: string,
  ) {}
}
