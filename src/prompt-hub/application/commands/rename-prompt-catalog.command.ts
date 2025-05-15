import { ICommand } from '@nestjs/cqrs';

export class RenamePromptCatalogCommand implements ICommand {
  constructor(
    public readonly catalogId: string,
    public readonly newName: string,
    public readonly userId: string,
  ) {}
}
