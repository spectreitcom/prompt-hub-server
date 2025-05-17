import { FavoritePromptView } from '../../views';

export abstract class FavoritePromptViewRepository {
  abstract save(favoritePromptView: FavoritePromptView): Promise<void>;
  abstract findById(id: string): Promise<FavoritePromptView>;
}
