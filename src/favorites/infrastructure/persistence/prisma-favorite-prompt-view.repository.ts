import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { FavoritePromptViewRepository } from '../../application';
import { FavoritePromptView } from '../../views';

@Injectable()
export class PrismaFavoritePromptViewRepository
  implements FavoritePromptViewRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(favoritePromptView: FavoritePromptView): Promise<void> {
    await this.prisma.favoritePromptView.upsert({
      where: {
        id: favoritePromptView.id,
      },
      update: {
        title: favoritePromptView.title,
        authorId: favoritePromptView.authorId,
        createdAt: favoritePromptView.createdAt,
      },
      create: {
        id: favoritePromptView.id,
        title: favoritePromptView.title,
        authorId: favoritePromptView.authorId,
        createdAt: favoritePromptView.createdAt,
      },
    });
  }

  async findById(id: string): Promise<FavoritePromptView> {
    const favoritePromptView = await this.prisma.favoritePromptView.findUnique({
      where: {
        id,
      },
    });

    if (!favoritePromptView) {
      return null;
    }

    return new FavoritePromptView(
      favoritePromptView.id,
      favoritePromptView.title,
      favoritePromptView.authorId,
      favoritePromptView.createdAt,
    );
  }
}
