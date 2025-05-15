import { ICommand } from '@nestjs/cqrs';

export class DeletePromptCatalogCommand implements ICommand {
  constructor(public readonly catalogId: string) {}
}
