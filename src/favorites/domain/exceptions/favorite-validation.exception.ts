import { FavoritesException } from './favorites.exception';

export class FavoriteValidationException extends FavoritesException {
  constructor(message: string) {
    super(message);
  }
}
