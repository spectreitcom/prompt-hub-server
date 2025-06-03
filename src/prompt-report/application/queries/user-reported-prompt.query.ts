import { PromptId, UserId } from '../../domain';

export class UserReportedPromptQuery {
  constructor(
    public readonly promptId: PromptId,
    public readonly reporterId: UserId,
  ) {}
}
