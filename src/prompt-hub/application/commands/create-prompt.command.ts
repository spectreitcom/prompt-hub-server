import { ICommand } from '@nestjs/cqrs';

export class CreatePromptCommand implements ICommand {
  constructor(public readonly authorId: string) {}
}
