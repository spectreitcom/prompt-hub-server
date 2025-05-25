import { ICommand } from '@nestjs/cqrs';

export class CopyPromptCommand implements ICommand {
  constructor(
    public readonly promptId: string,
    public readonly userId?: string,
  ) {}
}
