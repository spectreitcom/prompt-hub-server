import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptStatisticsViewRepository } from '../../application';
import { PromptStatisticsView } from '../../views';

@Injectable()
export class PrismaPromptStatisticsViewRepository
  implements PromptStatisticsViewRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(promptStatisticsView: PromptStatisticsView): Promise<void> {
    await this.prisma.promptStatisticsView.upsert({
      where: { promptId: promptStatisticsView.promptId },
      update: {
        copiedCount: promptStatisticsView.copiedCount,
        likedCount: promptStatisticsView.likedCount,
        dislikedCount: promptStatisticsView.dislikedCount,
        favoritesCount: promptStatisticsView.favoritesCount,
        viewCount: promptStatisticsView.viewCount,
      },
      create: {
        promptId: promptStatisticsView.promptId,
        copiedCount: promptStatisticsView.copiedCount,
        likedCount: promptStatisticsView.likedCount,
        dislikedCount: promptStatisticsView.dislikedCount,
        favoritesCount: promptStatisticsView.favoritesCount,
        viewCount: promptStatisticsView.viewCount,
      },
    });
  }

  async incrementViewCount(promptId: string): Promise<void> {
    await this.prisma.promptStatisticsView.upsert({
      where: { promptId },
      update: { viewCount: { increment: 1 } },
      create: {
        promptId,
        copiedCount: 0,
        likedCount: 0,
        dislikedCount: 0,
        favoritesCount: 0,
        viewCount: 1,
      },
    });
  }

  async incrementFavoritesCount(promptId: string): Promise<void> {
    await this.prisma.promptStatisticsView.upsert({
      where: { promptId },
      update: { favoritesCount: { increment: 1 } },
      create: {
        promptId,
        copiedCount: 0,
        likedCount: 0,
        dislikedCount: 0,
        favoritesCount: 1,
        viewCount: 0,
      },
    });
  }

  async incrementLikedCount(promptId: string): Promise<void> {
    await this.prisma.promptStatisticsView.upsert({
      where: { promptId },
      update: { likedCount: { increment: 1 } },
      create: {
        promptId,
        copiedCount: 0,
        likedCount: 1,
        dislikedCount: 0,
        favoritesCount: 0,
        viewCount: 0,
      },
    });
  }

  async incrementDislikedCount(promptId: string): Promise<void> {
    await this.prisma.promptStatisticsView.upsert({
      where: { promptId },
      update: { dislikedCount: { increment: 1 } },
      create: {
        promptId,
        copiedCount: 0,
        likedCount: 0,
        dislikedCount: 1,
        favoritesCount: 0,
        viewCount: 0,
      },
    });
  }

  async incrementCopiedCount(promptId: string): Promise<void> {
    await this.prisma.promptStatisticsView.upsert({
      where: { promptId },
      update: { copiedCount: { increment: 1 } },
      create: {
        promptId,
        copiedCount: 1,
        likedCount: 0,
        dislikedCount: 0,
        favoritesCount: 0,
        viewCount: 0,
      },
    });
  }

  async delete(promptId: string): Promise<void> {
    await this.prisma.promptStatisticsView.delete({
      where: { promptId },
    });
  }

  async findByPromptId(promptId: string): Promise<PromptStatisticsView> {
    const stats = await this.prisma.promptStatisticsView.findUnique({
      where: { promptId },
    });

    if (!stats) {
      return null;
    }

    return new PromptStatisticsView(
      stats.promptId,
      stats.copiedCount,
      stats.likedCount,
      stats.dislikedCount,
      stats.viewCount,
      stats.favoritesCount,
    );
  }
}
