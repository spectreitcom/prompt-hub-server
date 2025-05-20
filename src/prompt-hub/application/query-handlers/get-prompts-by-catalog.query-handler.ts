import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromptsByCatalogQuery } from '../queries';
import { PromptCatalogItemViewRepository } from '../ports';
import { PromptCatalogItemView } from '../../views';

@QueryHandler(GetPromptsByCatalogQuery)
export class GetPromptsByCatalogQueryHandler
  implements IQueryHandler<GetPromptsByCatalogQuery>
{
  constructor(
    private readonly promptCatalogItemViewRepository: PromptCatalogItemViewRepository,
  ) {}

  async execute(
    query: GetPromptsByCatalogQuery,
  ): Promise<PromptCatalogItemView[]> {
    return this.promptCatalogItemViewRepository.findForCatalog(
      query.catalogId,
      query.skip,
      query.take,
      query.userId,
      query.search,
    );
  }
}
