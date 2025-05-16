import { ICommand } from '@nestjs/cqrs';

export class RemovePromptFromFavoritesCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
  ) {}
}
