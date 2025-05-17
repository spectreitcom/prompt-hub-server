import { UserId } from '../../domain';
import { FavoritePromptEntryView } from '../../views';

export abstract class FavoritePromptEntryRepository {
  abstract findForUser(
    userId: UserId,
    search?: string, // search by title
    authorId?: UserId,
  ): Promise<FavoritePromptEntryView[]>;
}
