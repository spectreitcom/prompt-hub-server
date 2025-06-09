import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllTagsQuery } from '../queries';
import { TagEntryViewRepository } from '../ports';
import { TagEntryView } from '../../views';

export interface GetAllTagsResult {
  data: TagEntryView[];
  totalCount: number;
}

@QueryHandler(GetAllTagsQuery)
export class GetAllTagsQueryHandler
  implements IQueryHandler<GetAllTagsQuery, GetAllTagsResult>
{
  constructor(
    private readonly tagEntryViewRepository: TagEntryViewRepository,
  ) {}

  async execute(query: GetAllTagsQuery): Promise<GetAllTagsResult> {
    const { skip, take, search } = query;

    const [data, totalCount] = await Promise.all([
      this.tagEntryViewRepository.findAll(skip, take, search),
      this.tagEntryViewRepository.countAll(search),
    ]);

    return {
      data,
      totalCount,
    };
  }
}
