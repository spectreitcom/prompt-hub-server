import { ICommand } from '@nestjs/cqrs';

export class UpdatePromptCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly title: string,
    public readonly content: string,
    public readonly userId: string,
    public readonly instruction?: string,
  ) {}
}
