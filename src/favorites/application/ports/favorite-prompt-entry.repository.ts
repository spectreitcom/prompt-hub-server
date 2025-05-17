import { FavoritePromptEntryView } from '../../views';

export abstract class FavoritePromptEntryRepository {
  abstract findForUser(
    userId: string,
    search?: string, // search by title
    authorId?: string,
  ): Promise<FavoritePromptEntryView[]>;

  abstract save(favoritePromptEntry: FavoritePromptEntryView): Promise<void>;

  abstract findByUserAndPrompt(
    userId: string,
    promptId: string,
  ): Promise<FavoritePromptEntryView>;

  abstract delete(userId: string, promptId: string): Promise<void>;
}
