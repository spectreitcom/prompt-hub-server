import { FavoriteUserPublicView } from '../../views';

export abstract class FavoriteUserPublicRepository {
  abstract save(favoriteUserPublicView: FavoriteUserPublicView): Promise<void>;
  abstract findById(id: string): Promise<FavoriteUserPublicView>;
}
