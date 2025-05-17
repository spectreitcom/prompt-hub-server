import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { FavoritePromptReadRepository } from '../../application';
import { UserId } from '../../domain';
import { UserFavoritePromptView } from '../../views';

@Injectable()
export class PrismaFavoritePromptReadRepository
  implements FavoritePromptReadRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findForUser(
    userId: UserId,
    search?: string,
    authorId?: UserId,
  ): Promise<UserFavoritePromptView[]> {
    const favoritePrompts = await this.prisma.favoritePromptEntry.findMany({
      where: {
        userId: userId.getValue(),
        ...(search && { title: { contains: search, mode: 'insensitive' } }),
        ...(authorId && { authorId: authorId.getValue() }),
      },
    });

    return favoritePrompts.map(
      (favoritePrompt) =>
        new UserFavoritePromptView(
          favoritePrompt.promptId,
          favoritePrompt.title,
          favoritePrompt.authorId,
          favoritePrompt.authorName,
          favoritePrompt.authorAvatarUrl || '',
        ),
    );
  }
}
