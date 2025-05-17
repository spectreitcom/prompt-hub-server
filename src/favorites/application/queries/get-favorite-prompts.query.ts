import { IQuery } from '@nestjs/cqrs';

export class GetFavoritePromptsQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly skip: number = 0,
    public readonly take: number = 10,
    public readonly search?: string,
    public readonly authorId?: string,
  ) {}
}
