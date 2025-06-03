import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { AdminUserReadRepository } from '../../application/ports';
import { AdminUserId } from '../../domain/value-objects';
import { AdminUserView } from '../../views';

@Injectable()
export class PrismaAdminUserReadRepository implements AdminUserReadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: AdminUserId): Promise<AdminUserView> {
    const adminUserData = await this.prisma.adminUser.findUnique({
      where: { id: id.toString() },
    });

    if (!adminUserData) return null;

    return this.mapToView(adminUserData);
  }

  private mapToView(adminUserData: any): AdminUserView {
    return new AdminUserView(
      adminUserData.id,
      adminUserData.email,
      adminUserData.isSuperuser,
      adminUserData.isActive,
    );
  }
}
