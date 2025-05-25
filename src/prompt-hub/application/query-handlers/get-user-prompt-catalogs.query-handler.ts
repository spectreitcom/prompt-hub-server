import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserPromptCatalogsQuery } from '../queries';
import { PromptCatalogViewRepository } from '../ports';
import { PromptCatalogView } from '../../views';

@QueryHandler(GetUserPromptCatalogsQuery)
export class GetUserPromptCatalogsQueryHandler
  implements IQueryHandler<GetUserPromptCatalogsQuery>
{
  constructor(
    private readonly promptCatalogViewRepository: PromptCatalogViewRepository,
  ) {}

  async execute(
    query: GetUserPromptCatalogsQuery,
  ): Promise<PromptCatalogView[]> {
    return this.promptCatalogViewRepository.findForUser(
      query.userId,
      query.take,
      query.skip,
      query.search,
    );
  }
}
