import { AdminUser } from '../../domain';

export abstract class AdminUserRepository {
  abstract save(adminUser: AdminUser): Promise<void>;
  abstract findById(id: string): Promise<AdminUser>;
  abstract findByEmail(email: string): Promise<AdminUser>;
}
