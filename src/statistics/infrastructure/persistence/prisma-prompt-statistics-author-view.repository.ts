import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptStatisticsAuthorViewRepository } from '../../application';
import { PromptStatisticsAuthorView } from '../../views';

@Injectable()
export class PrismaPromptStatisticsAuthorViewRepository
  implements PromptStatisticsAuthorViewRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(
    promptStatisticsAuthorView: PromptStatisticsAuthorView,
  ): Promise<void> {
    await this.prisma.promptStatisticsAuthor.upsert({
      where: { promptId: promptStatisticsAuthorView.promptId },
      update: {
        authorId: promptStatisticsAuthorView.authorId,
      },
      create: {
        promptId: promptStatisticsAuthorView.promptId,
        authorId: promptStatisticsAuthorView.authorId,
      },
    });
  }

  async findByPromptId(promptId: string): Promise<PromptStatisticsAuthorView> {
    const stats = await this.prisma.promptStatisticsAuthor.findUnique({
      where: { promptId },
    });

    if (!stats) {
      return null;
    }

    return new PromptStatisticsAuthorView(stats.promptId, stats.authorId);
  }

  async delete(promptId: string): Promise<void> {
    await this.prisma.promptStatisticsAuthor.delete({
      where: { promptId },
    });
  }
}
