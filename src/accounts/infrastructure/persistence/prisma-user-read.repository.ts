import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { UserReadRepository } from '../../application';
import { UserId } from '../../domain';
import { UserProfileView } from '../../views';

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

  private mapToView(userData: any): UserProfileView {
    return new UserProfileView(
      userData.id,
      userData.name,
      userData.email,
      userData.avatarUrl,
    );
  }
}
