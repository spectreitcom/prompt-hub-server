import { IQuery } from '@nestjs/cqrs';

export class GetPopularTagsQuery implements IQuery {
  constructor(
    public readonly skip: number = 0,
    public readonly take: number = 10,
    public readonly search?: string,
  ) {}
}
