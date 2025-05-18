import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromptCatalogByIdQuery } from '../queries';
import { PromptCatalogViewRepository } from '../ports';
import { PromptCatalogView } from '../../views';

@QueryHandler(GetPromptCatalogByIdQuery)
export class GetPromptCatalogByIdQueryHandler
  implements IQueryHandler<GetPromptCatalogByIdQuery>
{
  constructor(
    private readonly promptCatalogViewRepository: PromptCatalogViewRepository,
  ) {}

  async execute(query: GetPromptCatalogByIdQuery): Promise<PromptCatalogView> {
    return this.promptCatalogViewRepository.findByIdAndUserId(
      query.catalogId,
      query.userId,
    );
  }
}
