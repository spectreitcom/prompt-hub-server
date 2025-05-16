import { ICommand } from '@nestjs/cqrs';
import { PromptId, UserId } from '../../domain';

export class AddPromptToFavoritesCommand implements ICommand {
  constructor(
    public readonly promptId: PromptId,
    public readonly userId: UserId,
  ) {}
}
