import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserPromptsQuery } from '../queries';
import { PromptListItemViewRepository } from '../ports';
import { PromptListItemView } from '../../views';

@QueryHandler(GetUserPromptsQuery)
export class GetUserPromptsQueryHandler
  implements IQueryHandler<GetUserPromptsQuery>
{
  constructor(
    private readonly promptListItemViewRepository: PromptListItemViewRepository,
  ) {}

  async execute(query: GetUserPromptsQuery): Promise<PromptListItemView[]> {
    return this.promptListItemViewRepository.getUsersList(
      query.userId,
      query.take,
      query.skip,
      query.search,
    );
  }
}
