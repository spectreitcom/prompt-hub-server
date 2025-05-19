import { UserSearchView } from '../../views';

export abstract class UserSearchViewRepository {
  abstract save(userSearchView: UserSearchView): Promise<void>;
  abstract findById(id: string): Promise<UserSearchView>;
}
