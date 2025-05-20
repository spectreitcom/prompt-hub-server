import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromptListQuery } from '../queries';
import { SearchPromptEntryViewRepository } from '../ports';
import { SearchPromptEntryView } from '../../views';

@QueryHandler(GetPromptListQuery)
export class GetPromptListQueryHandler
  implements IQueryHandler<GetPromptListQuery>
{
  constructor(
    private readonly searchPromptEntryViewRepository: SearchPromptEntryViewRepository,
  ) {}

  async execute(query: GetPromptListQuery): Promise<SearchPromptEntryView[]> {
    return this.searchPromptEntryViewRepository.getList(
      query.skip,
      query.take,
      query.search,
    );
  }
}
