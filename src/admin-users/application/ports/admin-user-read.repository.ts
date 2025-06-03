import { AdminUserView } from '../../views';
import { AdminUserId } from '../../domain/value-objects';

export abstract class AdminUserReadRepository {
  abstract findById(id: AdminUserId): Promise<AdminUserView>;
}
