import { ICommand } from '@nestjs/cqrs';

export class AddPromptToFavoritesCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
  ) {}
}
