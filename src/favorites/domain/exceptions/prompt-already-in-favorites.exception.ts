import { FavoritesException } from './favorites.exception';

export class PromptAlreadyInFavoritesException extends FavoritesException {
  constructor(promptId: string, userId: string) {
    super(
      `Prompt with id ${promptId} is already in favorites for user with id ${userId}.`,
    );
  }
}
