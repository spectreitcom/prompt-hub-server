import { IQuery } from '@nestjs/cqrs';

export class IsPromptInFavoritesQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly promptId: string,
  ) {}
}
