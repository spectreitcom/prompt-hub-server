import { ICommand } from '@nestjs/cqrs';

export class VotePromptCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
    public readonly voteType: 'UP' | 'DOWN',
  ) {}
}
