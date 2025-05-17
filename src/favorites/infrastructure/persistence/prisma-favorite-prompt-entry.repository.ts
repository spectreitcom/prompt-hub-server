import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { FavoritePromptEntryRepository } from '../../application';
import { FavoritePromptEntryView } from '../../views';

@Injectable()
export class PrismaFavoritePromptEntryRepository
  implements FavoritePromptEntryRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findForUser(
    userId: string,
    search?: string,
    authorId?: string,
  ): Promise<FavoritePromptEntryView[]> {
    const favoritePrompts = await this.prisma.favoritePromptEntry.findMany({
      where: {
        userId,
        ...(search && { title: { contains: search, mode: 'insensitive' } }),
        ...(authorId && { authorId }),
      },
    });

    return favoritePrompts.map(
      (favoritePrompt) =>
        new FavoritePromptEntryView(
          favoritePrompt.promptId,
          favoritePrompt.title,
          favoritePrompt.authorId,
          favoritePrompt.authorName,
          favoritePrompt.authorAvatarUrl || '',
          favoritePrompt.userId,
        ),
    );
  }

  async save(favoritePromptEntry: FavoritePromptEntryView): Promise<void> {
    await this.prisma.favoritePromptEntry.upsert({
      where: {
        userId_promptId: {
          userId: favoritePromptEntry.userId,
          promptId: favoritePromptEntry.promptId,
        },
      },
      update: {
        title: favoritePromptEntry.title,
        authorId: favoritePromptEntry.authorId,
        authorName: favoritePromptEntry.authorName,
        authorAvatarUrl: favoritePromptEntry.authorAvatarUrl,
      },
      create: {
        userId: favoritePromptEntry.userId,
        promptId: favoritePromptEntry.promptId,
        title: favoritePromptEntry.title,
        authorId: favoritePromptEntry.authorId,
        authorName: favoritePromptEntry.authorName,
        authorAvatarUrl: favoritePromptEntry.authorAvatarUrl,
        createdAt: new Date(),
      },
    });
  }
}
