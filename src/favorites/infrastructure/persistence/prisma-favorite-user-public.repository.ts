import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { FavoriteUserPublicRepository } from '../../application';
import { FavoriteUserPublicView } from '../../views';

@Injectable()
export class PrismaFavoriteUserPublicRepository
  implements FavoriteUserPublicRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(favoriteUserPublicView: FavoriteUserPublicView): Promise<void> {
    await this.prisma.favoriteUserPublicView.upsert({
      where: {
        id: favoriteUserPublicView.id,
      },
      update: {
        name: favoriteUserPublicView.name,
        avatarUrl: favoriteUserPublicView.avatarUrl,
      },
      create: {
        id: favoriteUserPublicView.id,
        name: favoriteUserPublicView.name,
        avatarUrl: favoriteUserPublicView.avatarUrl,
      },
    });
  }

  async findById(id: string): Promise<FavoriteUserPublicView> {
    const favoriteUserPublic =
      await this.prisma.favoriteUserPublicView.findUnique({
        where: {
          id,
        },
      });

    if (!favoriteUserPublic) {
      return null;
    }

    return new FavoriteUserPublicView(
      favoriteUserPublic.id,
      favoriteUserPublic.name,
      favoriteUserPublic.avatarUrl,
    );
  }
}
