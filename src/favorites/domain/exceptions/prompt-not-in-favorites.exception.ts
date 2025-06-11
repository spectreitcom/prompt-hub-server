import { FavoritesException } from './favorites.exception';

export class PromptNotInFavoritesException extends FavoritesException {
  constructor(promptId: string, userId: string) {
    super(
      `Prompt with id ${promptId} is not in favorites for user with id ${userId}.`,
    );
  }
}
