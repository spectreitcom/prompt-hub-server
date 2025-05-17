import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptDetailsViewRepository } from '../../application';
import { PromptDetailsView, PromptUserPublicView } from '../../views';

@Injectable()
export class PrismaPromptDetailsViewRepository extends PromptDetailsViewRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(promptDetailsView: PromptDetailsView): Promise<void> {
    await this.prisma.promptDetailsView.upsert({
      where: {
        id: promptDetailsView.id,
      },
      update: {
        title: promptDetailsView.title,
        content: promptDetailsView.content,
        isPublic: promptDetailsView.isPublic,
        status: promptDetailsView.status,
        createdAt: promptDetailsView.createdAt,
        likedCount: promptDetailsView.likedCount,
        copiedCount: promptDetailsView.copiedCount,
        viewCount: promptDetailsView.viewCount,
        authorId: promptDetailsView.author.id,
        authorName: promptDetailsView.author.name,
        authorAvatarUrl: promptDetailsView.author.avatarUrl,
      },
      create: {
        id: promptDetailsView.id,
        title: promptDetailsView.title,
        content: promptDetailsView.content,
        isPublic: promptDetailsView.isPublic,
        status: promptDetailsView.status,
        createdAt: promptDetailsView.createdAt,
        likedCount: promptDetailsView.likedCount,
        copiedCount: promptDetailsView.copiedCount,
        viewCount: promptDetailsView.viewCount,
        authorId: promptDetailsView.author.id,
        authorName: promptDetailsView.author.name,
        authorAvatarUrl: promptDetailsView.author.avatarUrl,
      },
    });
  }

  async findById(id: string): Promise<PromptDetailsView> {
    const promptDetailsView = await this.prisma.promptDetailsView.findUnique({
      where: {
        id,
      },
    });

    if (!promptDetailsView) {
      return null;
    }

    return new PromptDetailsView(
      promptDetailsView.id,
      promptDetailsView.title,
      promptDetailsView.content,
      promptDetailsView.isPublic,
      promptDetailsView.status,
      promptDetailsView.createdAt,
      promptDetailsView.likedCount,
      promptDetailsView.copiedCount,
      promptDetailsView.viewCount,
      new PromptUserPublicView(
        promptDetailsView.authorId,
        promptDetailsView.authorName,
        promptDetailsView.authorAvatarUrl || undefined,
      ),
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.promptDetailsView.delete({
      where: {
        id,
      },
    });
  }
}
