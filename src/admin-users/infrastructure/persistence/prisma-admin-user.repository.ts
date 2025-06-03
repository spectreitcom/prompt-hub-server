import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { AdminUserRepository } from '../../application';
import {
  AdminUserId,
  EmailAddress,
  IsActive,
  IsSuperuser,
  PasswordHash,
  AdminUser,
} from '../../domain';

@Injectable()
export class PrismaAdminUserRepository extends AdminUserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(adminUser: AdminUser): Promise<void> {
    await this.prisma.adminUser.upsert({
      where: { id: adminUser.getId().toString() },
      update: {
        email: adminUser.getEmail().getValue(),
        passwordHash: adminUser.getPasswordHash().getValue(),
        isSuperuser: adminUser.isSuperUser().getValue(),
        isActive: adminUser.isActiveUser().getValue(),
      },
      create: {
        id: adminUser.getId().getValue(),
        email: adminUser.getEmail().getValue(),
        passwordHash: adminUser.getPasswordHash().getValue(),
        isSuperuser: adminUser.isSuperUser().getValue(),
        isActive: adminUser.isActiveUser().getValue(),
      },
    });
  }

  async findById(id: AdminUserId): Promise<AdminUser> {
    const adminUser = await this.prisma.adminUser.findUnique({
      where: { id: id.getValue() },
    });

    if (!adminUser) {
      return null;
    }

    return this.mapToDomain(adminUser);
  }

  async findByEmail(email: EmailAddress): Promise<AdminUser> {
    const adminUser = await this.prisma.adminUser.findUnique({
      where: { email: email.getValue() },
    });

    if (!adminUser) {
      return null;
    }

    return this.mapToDomain(adminUser);
  }

  private mapToDomain(adminUser: {
    id: string;
    email: string;
    passwordHash: string;
    isSuperuser: boolean;
    createdAt: Date;
    isActive: boolean;
  }): AdminUser {
    return AdminUser.createFromData(
      AdminUserId.create(adminUser.id),
      EmailAddress.create(adminUser.email),
      PasswordHash.create(adminUser.passwordHash),
      IsSuperuser.create(adminUser.isSuperuser),
      adminUser.createdAt,
      IsActive.create(adminUser.isActive),
    );
  }
}
