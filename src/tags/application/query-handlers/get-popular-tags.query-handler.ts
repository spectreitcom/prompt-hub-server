import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPopularTagsQuery } from '../queries';
import { TagEntryViewRepository } from '../ports';
import { TagEntryView } from '../../views';

@QueryHandler(GetPopularTagsQuery)
export class GetPopularTagsQueryHandler
  implements IQueryHandler<GetPopularTagsQuery, TagEntryView[]>
{
  constructor(
    private readonly tagEntryViewRepository: TagEntryViewRepository,
  ) {}

  async execute(query: GetPopularTagsQuery): Promise<TagEntryView[]> {
    const { skip, take, search } = query;

    return this.tagEntryViewRepository.getPopularTags(skip, take, search);
  }
}
