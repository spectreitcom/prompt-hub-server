import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { UserSearchViewRepository } from '../../application';
import { UserSearchView } from '../../views';

@Injectable()
export class PrismaUserSearchViewRepository extends UserSearchViewRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(userSearchView: UserSearchView): Promise<void> {
    await this.prisma.userSearchView.upsert({
      where: {
        id: userSearchView.id,
      },
      update: {
        name: userSearchView.name,
        avatarUrl: userSearchView.avatarUrl,
      },
      create: {
        id: userSearchView.id,
        name: userSearchView.name,
        avatarUrl: userSearchView.avatarUrl,
      },
    });
  }

  async findById(id: string): Promise<UserSearchView> {
    const userSearchView = await this.prisma.userSearchView.findUnique({
      where: {
        id,
      },
    });

    if (!userSearchView) {
      return null;
    }

    return new UserSearchView(
      userSearchView.id,
      userSearchView.name,
      userSearchView.avatarUrl || undefined,
    );
  }
}
