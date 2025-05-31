import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptDailyStatsViewRepository } from '../../application';
import { PromptDailyStatsView } from '../../views';

@Injectable()
export class PrismaPromptDailyStatsViewRepository
  implements PromptDailyStatsViewRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(promptDailyStatsView: PromptDailyStatsView): Promise<void> {
    await this.prisma.promptDailyStats.upsert({
      where: {
        promptId_date: {
          promptId: promptDailyStatsView.promptId,
          date: promptDailyStatsView.date,
        },
      },
      update: {
        likedCount: promptDailyStatsView.likedCount,
        dislikedCount: promptDailyStatsView.dislikedCount,
        viewCount: promptDailyStatsView.viewCount,
        favoritesCount: promptDailyStatsView.favoritesCount,
        // Note: copiedCount is in the Prisma schema but not in the view model
        // Using 0 as a default value
        copiedCount: 0,
      },
      create: {
        promptId: promptDailyStatsView.promptId,
        date: promptDailyStatsView.date,
        likedCount: promptDailyStatsView.likedCount,
        dislikedCount: promptDailyStatsView.dislikedCount,
        viewCount: promptDailyStatsView.viewCount,
        favoritesCount: promptDailyStatsView.favoritesCount,
        copiedCount: 0, // Default value
      },
    });
  }

  async findById(id: string): Promise<PromptDailyStatsView> {
    // The id parameter is likely a composite of promptId and date
    // We need to parse it to get the individual values
    const [promptId, dateStr] = id.split('_');
    const date = new Date(dateStr);

    const stats = await this.prisma.promptDailyStats.findUnique({
      where: {
        promptId_date: {
          promptId,
          date,
        },
      },
    });

    if (!stats) {
      return null;
    }

    return new PromptDailyStatsView(
      stats.promptId,
      stats.date,
      stats.likedCount,
      stats.dislikedCount,
      stats.viewCount,
      stats.favoritesCount,
    );
  }

  async incrementViewCount(id: string): Promise<void> {
    const [promptId, dateStr] = id.split('_');
    const date = new Date(dateStr);

    await this.prisma.promptDailyStats.upsert({
      where: {
        promptId_date: {
          promptId,
          date,
        },
      },
      update: { viewCount: { increment: 1 } },
      create: {
        promptId,
        date,
        likedCount: 0,
        dislikedCount: 0,
        viewCount: 1,
        favoritesCount: 0,
        copiedCount: 0,
      },
    });
  }

  async incrementLikedCount(id: string): Promise<void> {
    const [promptId, dateStr] = id.split('_');
    const date = new Date(dateStr);

    await this.prisma.promptDailyStats.upsert({
      where: {
        promptId_date: {
          promptId,
          date,
        },
      },
      update: { likedCount: { increment: 1 } },
      create: {
        promptId,
        date,
        likedCount: 1,
        dislikedCount: 0,
        viewCount: 0,
        favoritesCount: 0,
        copiedCount: 0,
      },
    });
  }

  async incrementDislikedCount(id: string): Promise<void> {
    const [promptId, dateStr] = id.split('_');
    const date = new Date(dateStr);

    await this.prisma.promptDailyStats.upsert({
      where: {
        promptId_date: {
          promptId,
          date,
        },
      },
      update: { dislikedCount: { increment: 1 } },
      create: {
        promptId,
        date,
        likedCount: 0,
        dislikedCount: 1,
        viewCount: 0,
        favoritesCount: 0,
        copiedCount: 0,
      },
    });
  }

  async incrementFavoritesCount(id: string): Promise<void> {
    const [promptId, dateStr] = id.split('_');
    const date = new Date(dateStr);

    await this.prisma.promptDailyStats.upsert({
      where: {
        promptId_date: {
          promptId,
          date,
        },
      },
      update: { favoritesCount: { increment: 1 } },
      create: {
        promptId,
        date,
        likedCount: 0,
        dislikedCount: 0,
        viewCount: 0,
        favoritesCount: 1,
        copiedCount: 0,
      },
    });
  }

  async incrementCopiedCount(id: string): Promise<void> {
    const [promptId, dateStr] = id.split('_');
    const date = new Date(dateStr);

    await this.prisma.promptDailyStats.upsert({
      where: {
        promptId_date: {
          promptId,
          date,
        },
      },
      update: { copiedCount: { increment: 1 } },
      create: {
        promptId,
        date,
        likedCount: 0,
        dislikedCount: 0,
        viewCount: 0,
        favoritesCount: 0,
        copiedCount: 1,
      },
    });
  }

  async deleteByPromptId(promptId: string): Promise<void> {
    await this.prisma.promptDailyStats.deleteMany({
      where: { promptId },
    });
  }
}
