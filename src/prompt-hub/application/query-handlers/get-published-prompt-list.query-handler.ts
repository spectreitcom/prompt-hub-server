import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPublishedPromptListQuery } from '../queries';
import { PromptListItemViewRepository } from '../ports';
import { PromptListItemView } from '../../views';

@QueryHandler(GetPublishedPromptListQuery)
export class GetPublishedPromptListQueryHandler
  implements IQueryHandler<GetPublishedPromptListQuery>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
  ) {}

  async execute(
    query: GetPublishedPromptListQuery,
  ): Promise<PromptListItemView[]> {
    return this.promptListItemViewRepository.getUsersPublishedPromptsList(
      query.userId,
      query.take,
      query.skip,
      query.search,
      query.catalogId,
    );
  }
}
