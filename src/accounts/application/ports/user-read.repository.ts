import { UserProfileView } from '../../views';
import { UserId } from '../../domain';

export abstract class UserReadRepository {
  abstract findProfileById(id: UserId): Promise<UserProfileView>;
}
