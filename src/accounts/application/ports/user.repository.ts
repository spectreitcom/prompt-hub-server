import { EmailAddress, User, UserId } from '../../domain';

export abstract class UserRepository {
  abstract findByEmail(email: EmailAddress): Promise<User>;
  abstract findById(id: UserId): Promise<User>;
  abstract save(user: User): Promise<void>;
}
