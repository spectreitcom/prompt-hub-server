import { ICommand } from '@nestjs/cqrs';

export class RemovePromptFromCatalogCommand implements ICommand {
  constructor(
    public readonly catalogId: string,
    public readonly promptId: string,
  ) {}
}
