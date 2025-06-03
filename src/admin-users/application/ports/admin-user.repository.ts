import { AdminUser, AdminUserId, EmailAddress } from '../../domain';

export abstract class AdminUserRepository {
  abstract save(adminUser: AdminUser): Promise<void>;
  abstract findById(id: AdminUserId): Promise<AdminUser>;
  abstract findByEmail(email: EmailAddress): Promise<AdminUser>;
}
