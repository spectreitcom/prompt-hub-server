import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { UserReadRepository } from '../../application';
import { UserId } from '../../domain';
import { UserProfileView } from '../../views';
import { User } from '@prisma/client';

@Injectable()
export class PrismaUserReadRepository implements UserReadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProfileById(id: UserId): Promise<UserProfileView> {
    const userData = await this.prisma.user.findUnique({
      where: { id: id.getValue() },
    });

    if (!userData) return null;

    return this.mapToView(userData);
  }

  async findAllProfiles(
    skip: number,
    take: number,
  ): Promise<UserProfileView[]> {
    const users = await this.prisma.user.findMany({
      skip,
      take,
      orderBy: { name: 'asc' },
    });

    return users.map((user) => this.mapToView(user));
  }

  async countAllProfiles(): Promise<number> {
    return this.prisma.user.count();
  }

  private mapToView(userData: User): UserProfileView {
    return new UserProfileView(
      userData.id,
      userData.name,
      userData.email,
      userData.avatarUrl,
    );
  }
}
