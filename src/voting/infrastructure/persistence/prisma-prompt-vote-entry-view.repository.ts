import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptVoteEntryViewRepository } from '../../application';
import { PromptVoteEntryView } from '../../views';

@Injectable()
export class PrismaPromptVoteEntryViewRepository
  implements PromptVoteEntryViewRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async exists(promptId: string, userId: string): Promise<boolean> {
    const count = await this.prisma.promptVoteEntry.count({
      where: {
        promptId,
        userId,
      },
    });

    return count > 0;
  }

  async findByPromptAndUser(
    promptId: string,
    userId: string,
  ): Promise<PromptVoteEntryView> {
    const entry = await this.prisma.promptVoteEntry.findUnique({
      where: {
        userId_promptId: {
          userId,
          promptId,
        },
      },
    });

    if (!entry) {
      return null;
    }

    return new PromptVoteEntryView(
      entry.userId,
      entry.promptId,
      entry.vote,
      entry.votedAt,
    );
  }

  async save(promptVoteEntryView: PromptVoteEntryView): Promise<void> {
    await this.prisma.promptVoteEntry.upsert({
      where: {
        userId_promptId: {
          userId: promptVoteEntryView.userId,
          promptId: promptVoteEntryView.promptId,
        },
      },
      update: {
        vote: promptVoteEntryView.vote,
        votedAt: promptVoteEntryView.votedAt,
      },
      create: {
        userId: promptVoteEntryView.userId,
        promptId: promptVoteEntryView.promptId,
        vote: promptVoteEntryView.vote,
        votedAt: promptVoteEntryView.votedAt,
      },
    });
  }
}
