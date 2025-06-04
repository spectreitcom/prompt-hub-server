import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { AdminUserReadRepository } from '../../application';
import { AdminUserView } from '../../views';
import { AdminUser } from '@prisma/client';

@Injectable()
export class PrismaAdminUserReadRepository implements AdminUserReadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<AdminUserView> {
    const adminUserData = await this.prisma.adminUser.findUnique({
      where: { id },
    });

    if (!adminUserData) return null;

    return this.mapToView(adminUserData);
  }

  async findAll(skip: number, take: number): Promise<AdminUserView[]> {
    const adminUsersData = await this.prisma.adminUser.findMany({
      skip,
      take,
    });

    return adminUsersData.map((data) => this.mapToView(data));
  }

  private mapToView(adminUserData: AdminUser): AdminUserView {
    return new AdminUserView(
      adminUserData.id,
      adminUserData.email,
      adminUserData.isSuperuser,
      adminUserData.isActive,
    );
  }
}
