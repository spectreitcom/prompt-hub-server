import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromptListQuery } from '../queries';
import { PromptListItemViewRepository } from '../ports';
import { PromptListItemView } from '../../views';

@QueryHandler(GetPromptListQuery)
export class GetPromptListQueryHandler
  implements IQueryHandler<GetPromptListQuery>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
  ) {}

  async execute(query: GetPromptListQuery): Promise<PromptListItemView[]> {
    return this.promptListItemViewRepository.getList(
      query.take,
      query.skip,
      query.search,
    );
  }
}
