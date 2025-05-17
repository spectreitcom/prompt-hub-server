import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFavoritePromptsQuery } from '../queries';
import { FavoritePromptEntryRepository } from '../ports';
import { FavoritePromptEntryView } from '../../views';

@QueryHandler(GetFavoritePromptsQuery)
export class GetFavoritePromptsQueryHandler
  implements IQueryHandler<GetFavoritePromptsQuery, FavoritePromptEntryView[]>
{
  constructor(
    private readonly favoritePromptEntryRepository: FavoritePromptEntryRepository,
  ) {}

  async execute(
    query: GetFavoritePromptsQuery,
  ): Promise<FavoritePromptEntryView[]> {
    const { userId, skip, take, search, authorId } = query;

    return this.favoritePromptEntryRepository.findForUser(
      userId,
      skip,
      take,
      search,
      authorId,
    );
  }
}
