import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { FavoritePromptEntryRepository } from '../../application';
import { UserId } from '../../domain';
import { FavoritePromptEntryView } from '../../views';

@Injectable()
export class PrismaFavoritePromptEntryRepository
  implements FavoritePromptEntryRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findForUser(
    userId: UserId,
    search?: string,
    authorId?: UserId,
  ): Promise<FavoritePromptEntryView[]> {
    const favoritePrompts = await this.prisma.favoritePromptEntry.findMany({
      where: {
        userId: userId.getValue(),
        ...(search && { title: { contains: search, mode: 'insensitive' } }),
        ...(authorId && { authorId: authorId.getValue() }),
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
        ),
    );
  }
}
