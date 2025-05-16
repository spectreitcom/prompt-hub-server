import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { FavoritePromptRepository } from '../../application';
import {
  FavoritePromptId,
  PromptId,
  UserId,
  FavoritePrompt,
} from '../../domain';

@Injectable()
export class PrismaFavoritePromptRepository
  implements FavoritePromptRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(favoritePrompt: FavoritePrompt): Promise<void> {
    await this.prisma.favoritePrompt.upsert({
      where: {
        id: favoritePrompt.getId().getValue(),
      },
      update: {
        promptId: favoritePrompt.getPromptId().getValue(),
        userId: favoritePrompt.getUserId().getValue(),
        createdAt: favoritePrompt.getCreatedAt(),
      },
      create: {
        id: favoritePrompt.getId().getValue(),
        promptId: favoritePrompt.getPromptId().getValue(),
        userId: favoritePrompt.getUserId().getValue(),
        createdAt: favoritePrompt.getCreatedAt(),
      },
    });
  }

  async getById(id: FavoritePromptId): Promise<FavoritePrompt | null> {
    const favoritePrompt = await this.prisma.favoritePrompt.findUnique({
      where: {
        id: id.getValue(),
      },
    });

    if (!favoritePrompt) {
      return null;
    }

    return new FavoritePrompt(
      FavoritePromptId.create(favoritePrompt.id),
      PromptId.create(favoritePrompt.promptId),
      UserId.create(favoritePrompt.userId),
      favoritePrompt.createdAt,
    );
  }

  async existsByPromptIdAndUserId(
    promptId: PromptId,
    userId: UserId,
  ): Promise<boolean> {
    const count = await this.prisma.favoritePrompt.count({
      where: {
        promptId: promptId.getValue(),
        userId: userId.getValue(),
      },
    });

    return count > 0;
  }

  async getByPromptIdAndUserId(
    promptId: PromptId,
    userId: UserId,
  ): Promise<FavoritePrompt | null> {
    const favoritePrompt = await this.prisma.favoritePrompt.findFirst({
      where: {
        promptId: promptId.getValue(),
        userId: userId.getValue(),
      },
    });

    if (!favoritePrompt) {
      return null;
    }

    return new FavoritePrompt(
      FavoritePromptId.create(favoritePrompt.id),
      PromptId.create(favoritePrompt.promptId),
      UserId.create(favoritePrompt.userId),
      favoritePrompt.createdAt,
    );
  }
}
