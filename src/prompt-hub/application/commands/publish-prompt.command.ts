import { ICommand } from '@nestjs/cqrs';

export class PublishPromptCommand implements ICommand {
  constructor(public readonly promptId: string) {}
}
