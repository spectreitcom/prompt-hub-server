import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOtherAuthorPromptsQuery } from '../queries';
import { SearchPromptEntryViewRepository } from '../ports';
import { SearchPromptEntryView } from '../../views';

@QueryHandler(GetOtherAuthorPromptsQuery)
export class GetOtherAuthorPromptsQueryHandler
  implements IQueryHandler<GetOtherAuthorPromptsQuery>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
  ) {}

  async execute(
    query: GetOtherAuthorPromptsQuery,
  ): Promise<SearchPromptEntryView[]> {
    return this.searchPromptEntryViewRepository.findByAuthor(
      query.authorId,
      query.skip,
      query.take,
      query.excludedPromptIds,
      query.search,
    );
  }
}
