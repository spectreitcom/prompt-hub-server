import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptVoteRepository } from '../../application';
import {
  PromptId,
  UserId,
  PromptVote,
  PromptVoteId,
  VoteType,
} from '../../domain';

@Injectable()
export class PrismaPromptVoteRepository implements PromptVoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exists(promptId: PromptId, userId: UserId): Promise<boolean> {
    const count = await this.prisma.promptVote.count({
      where: {
        promptId: promptId.getValue(),
        userId: userId.getValue(),
      },
    });
    return count > 0;
  }

  async getByPromptAndUser(
    promptId: PromptId,
    userId: UserId,
  ): Promise<PromptVote> {
    const voteData = await this.prisma.promptVote.findUnique({
      where: {
        promptId_userId: {
          promptId: promptId.getValue(),
          userId: userId.getValue(),
        },
      },
    });

    if (!voteData) {
      throw new NotFoundException(
        `Vote for prompt ${promptId.getValue()} by user ${userId.getValue()} not found`,
      );
    }

    return this.mapToDomain(voteData);
  }

  async save(vote: PromptVote): Promise<void> {
    await this.prisma.promptVote.upsert({
      where: {
        id: vote.getId().getValue(),
      },
      update: {
        voteType: vote.getVoteType().getValue(),
        updatedAt: new Date(),
      },
      create: {
        id: vote.getId().getValue(),
        promptId: vote.getPromptId().getValue(),
        userId: vote.getUserId().getValue(),
        voteType: vote.getVoteType().getValue(),
        createdAt: vote.getCreatedAt(),
      },
    });
  }

  private mapToDomain(voteData: any): PromptVote {
    return new PromptVote(
      PromptVoteId.create(voteData.id),
      PromptId.create(voteData.promptId),
      UserId.create(voteData.userId),
      VoteType.create(voteData.voteType),
      voteData.createdAt,
    );
  }
}
