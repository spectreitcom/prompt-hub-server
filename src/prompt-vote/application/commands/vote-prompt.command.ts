import { ICommand } from '@nestjs/cqrs';
import { VoteTypeValue } from '../../domain';

export class VotePromptCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
    public readonly voteType: VoteTypeValue,
  ) {}
}
