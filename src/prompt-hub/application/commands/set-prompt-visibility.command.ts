import { ICommand } from '@nestjs/cqrs';

export class SetPromptVisibilityCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly isPublic: boolean,
  ) {}
}
