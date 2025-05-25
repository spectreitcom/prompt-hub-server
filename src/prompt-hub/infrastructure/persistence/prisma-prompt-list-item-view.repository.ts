import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptListItemViewRepository } from '../../application';
import { PromptListItemView, PromptUserPublicView } from '../../views';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaPromptListItemViewRepository
  implements PromptListItemViewRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async save(promptListItemView: PromptListItemView): Promise<void> {
    await this.prisma.promptListItemView.upsert({
      where: {
        id: promptListItemView.id,
      },
      update: {
        title: promptListItemView.title,
        contentPreview: promptListItemView.contentPreview,
        copiedCount: promptListItemView.copiedCount,
        likedCount: promptListItemView.likedCount,
        viewCount: promptListItemView.viewCount,
        createdAt: promptListItemView.createdAt,
        isPublic: promptListItemView.isPublic,
        status: promptListItemView.status,
        authorId: promptListItemView.author.id,
        authorName: promptListItemView.author.name,
        authorAvatarUrl: promptListItemView.author.avatarUrl,
      },
      create: {
        id: promptListItemView.id,
        title: promptListItemView.title,
        contentPreview: promptListItemView.contentPreview,
        copiedCount: promptListItemView.copiedCount,
        likedCount: promptListItemView.likedCount,
        viewCount: promptListItemView.viewCount,
        createdAt: promptListItemView.createdAt,
        isPublic: promptListItemView.isPublic,
        status: promptListItemView.status,
        authorId: promptListItemView.author.id,
        authorName: promptListItemView.author.name,
        authorAvatarUrl: promptListItemView.author.avatarUrl,
      },
    });
  }

  async getList(
    take: number,
    skip: number,
    search?: string,
  ): Promise<PromptListItemView[]> {
    const where: Prisma.PromptListItemViewWhereInput = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { contentPreview: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const promptListItems = await this.prisma.promptListItemView.findMany({
      where,
      orderBy: {
        likedCount: 'desc', // Sort by most likes first
      },
      take,
      skip,
    });

    return promptListItems.map(
      (item) =>
        new PromptListItemView(
          item.id,
          item.title,
          item.contentPreview,
          item.likedCount,
          item.copiedCount,
          item.viewCount,
          item.createdAt,
          item.isPublic,
          item.status,
          new PromptUserPublicView(
            item.authorId,
            item.authorName,
            item.authorAvatarUrl || undefined,
          ),
        ),
    );
  }

  async findById(id: string): Promise<PromptListItemView> {
    const promptListItem = await this.prisma.promptListItemView.findUnique({
      where: {
        id,
      },
    });

    if (!promptListItem) {
      return null;
    }

    return new PromptListItemView(
      promptListItem.id,
      promptListItem.title,
      promptListItem.contentPreview,
      promptListItem.likedCount,
      promptListItem.copiedCount,
      promptListItem.viewCount,
      promptListItem.createdAt,
      promptListItem.isPublic,
      promptListItem.status,
      new PromptUserPublicView(
        promptListItem.authorId,
        promptListItem.authorName,
        promptListItem.authorAvatarUrl || undefined,
      ),
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.promptListItemView.delete({
      where: {
        id,
      },
    });
  }

  async getUsersList(
    userId: string,
    take: number,
    skip: number,
    search?: string,
  ): Promise<PromptListItemView[]> {
    const where: Prisma.PromptListItemViewWhereInput = {
      authorId: userId,
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { contentPreview: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const promptListItems = await this.prisma.promptListItemView.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    });

    return promptListItems.map(
      (item) =>
        new PromptListItemView(
          item.id,
          item.title,
          item.contentPreview,
          item.likedCount,
          item.copiedCount,
          item.viewCount,
          item.createdAt,
          item.isPublic,
          item.status,
          new PromptUserPublicView(
            item.authorId,
            item.authorName,
            item.authorAvatarUrl || undefined,
          ),
        ),
    );
  }

  async getPublishedList(
    take: number,
    skip: number,
    search?: string,
  ): Promise<PromptListItemView[]> {
    const where: Prisma.PromptListItemViewWhereInput = {
      status: 'PUBLISHED',
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { contentPreview: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const promptListItems = await this.prisma.promptListItemView.findMany({
      where,
      orderBy: {
        likedCount: 'desc', // Sort by most likes first
      },
      take,
      skip,
    });

    return promptListItems.map(
      (item) =>
        new PromptListItemView(
          item.id,
          item.title,
          item.contentPreview,
          item.likedCount,
          item.copiedCount,
          item.viewCount,
          item.createdAt,
          item.isPublic,
          item.status,
          new PromptUserPublicView(
            item.authorId,
            item.authorName,
            item.authorAvatarUrl || undefined,
          ),
        ),
    );
  }

  async getUsersPublishedPromptsList(
    userId: string,
    take: number,
    skip: number,
    search?: string,
  ): Promise<PromptListItemView[]> {
    const where: Prisma.PromptListItemViewWhereInput = {
      authorId: userId,
      status: 'PUBLISHED',
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { contentPreview: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const promptListItems = await this.prisma.promptListItemView.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    });

    return promptListItems.map(
      (item) =>
        new PromptListItemView(
          item.id,
          item.title,
          item.contentPreview,
          item.likedCount,
          item.copiedCount,
          item.viewCount,
          item.createdAt,
          item.isPublic,
          item.status,
          new PromptUserPublicView(
            item.authorId,
            item.authorName,
            item.authorAvatarUrl || undefined,
          ),
        ),
    );
  }
}
