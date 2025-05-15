import { ICommand } from '@nestjs/cqrs';

export class DeletePromptCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
  ) {}
}
