import { ICommand } from '@nestjs/cqrs';

export class AddPromptToCatalogCommand implements ICommand {
  constructor(
    public readonly catalogId: string,
    public readonly promptId: string,
  ) {}
}
