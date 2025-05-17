import { UserId } from '../../domain';
import { UserFavoritePromptView } from '../../views';

export abstract class FavoritePromptReadRepository {
  abstract findForUser(
    userId: UserId,
    search?: string, // search by title
    authorId?: UserId,
  ): Promise<UserFavoritePromptView[]>;
}
