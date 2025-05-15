import { ICommand } from '@nestjs/cqrs';

export class CreatePromptCatalogCommand implements ICommand {
  constructor(
    public readonly ownerId: string,
    public readonly name: string,
  ) {}
}
