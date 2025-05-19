import { ICommand } from '@nestjs/cqrs';

export class PromptViewedCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
  ) {}
}
