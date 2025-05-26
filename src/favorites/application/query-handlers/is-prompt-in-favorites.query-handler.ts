import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IsPromptInFavoritesQuery } from '../queries';
import { FavoritePromptRepository } from '../ports';
import { PromptId, UserId } from '../../domain';

@QueryHandler(IsPromptInFavoritesQuery)
export class IsPromptInFavoritesQueryHandler
  implements IQueryHandler<IsPromptInFavoritesQuery, boolean>
{
  constructor(
    private readonly favoritePromptRepository: FavoritePromptRepository,
  ) {}

  async execute(query: IsPromptInFavoritesQuery): Promise<boolean> {
    const { userId, promptId } = query;

    return this.favoritePromptRepository.existsByPromptIdAndUserId(
      PromptId.create(promptId),
      UserId.create(userId),
    );
  }
}
