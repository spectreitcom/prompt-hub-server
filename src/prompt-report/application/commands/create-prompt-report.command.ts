import { ICommand } from '@nestjs/cqrs';
import { PromptId, PromptReportReason, UserId } from '../../domain';

export class CreatePromptReportCommand implements ICommand {
  constructor(
    public readonly promptId: PromptId,
    public readonly reporterId: UserId,
    public readonly reason: PromptReportReason,
  ) {}
}
