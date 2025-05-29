import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { SearchPromptEntryViewRepository } from '../../application';
import { SearchPromptEntryView, UserSearchView } from '../../views';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaSearchPromptEntryViewRepository extends SearchPromptEntryViewRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(searchPromptEntryView: SearchPromptEntryView): Promise<void> {
    await this.prisma.searchPromptEntry.upsert({
      where: {
        id: searchPromptEntryView.id,
      },
      update: {
        title: searchPromptEntryView.title,
        content: searchPromptEntryView.content,
        authorId: searchPromptEntryView.author.id,
        authorName: searchPromptEntryView.author.name,
        authorAvatarUrl: searchPromptEntryView.author.avatarUrl,
        isPublic: searchPromptEntryView.isPublic,
        status: searchPromptEntryView.status,
        copiedCount: searchPromptEntryView.copiedCount,
        likedCount: searchPromptEntryView.likedCount,
        viewCount: searchPromptEntryView.viewCount,
        createdAt: searchPromptEntryView.createdAt,
        updatedAt: searchPromptEntryView.updatedAt,
        tagValues: searchPromptEntryView.tags,
      },
      create: {
        id: searchPromptEntryView.id,
        title: searchPromptEntryView.title,
        content: searchPromptEntryView.content,
        authorId: searchPromptEntryView.author.id,
        authorName: searchPromptEntryView.author.name,
        authorAvatarUrl: searchPromptEntryView.author.avatarUrl,
        isPublic: searchPromptEntryView.isPublic,
        status: searchPromptEntryView.status,
        copiedCount: searchPromptEntryView.copiedCount,
        likedCount: searchPromptEntryView.likedCount,
        viewCount: searchPromptEntryView.viewCount,
        createdAt: searchPromptEntryView.createdAt,
        updatedAt: searchPromptEntryView.updatedAt,
        tagValues: searchPromptEntryView.tags,
      },
    });
  }

  async findById(id: string): Promise<SearchPromptEntryView> {
    const searchPromptEntry = await this.prisma.searchPromptEntry.findUnique({
      where: {
        id,
      },
    });

    if (!searchPromptEntry) {
      return null;
    }

    return new SearchPromptEntryView(
      searchPromptEntry.id,
      searchPromptEntry.title,
      searchPromptEntry.content,
      new UserSearchView(
        searchPromptEntry.authorId,
        searchPromptEntry.authorName,
        searchPromptEntry.authorAvatarUrl || undefined,
      ),
      searchPromptEntry.isPublic,
      searchPromptEntry.status,
      searchPromptEntry.copiedCount,
      searchPromptEntry.viewCount,
      searchPromptEntry.likedCount,
      searchPromptEntry.createdAt,
      searchPromptEntry.updatedAt,
      searchPromptEntry.tagValues,
    );
  }

  async getList(
    skip: number,
    take: number,
    search?: string,
    tags?: string[],
  ): Promise<SearchPromptEntryView[]> {
    const where: Prisma.SearchPromptEntryWhereInput = {
      isPublic: true,
      status: 'PUBLISHED',
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(tags && tags.length > 0
        ? {
            tagValues: {
              hasSome: tags,
            },
          }
        : {}),
    };

    const searchPromptEntries = await this.prisma.searchPromptEntry.findMany({
      where,
      orderBy: {
        likedCount: 'desc', // Sort by most likes first
      },
      skip,
      take,
    });

    return searchPromptEntries.map(
      (entry) =>
        new SearchPromptEntryView(
          entry.id,
          entry.title,
          entry.content,
          new UserSearchView(
            entry.authorId,
            entry.authorName,
            entry.authorAvatarUrl || undefined,
          ),
          entry.isPublic,
          entry.status,
          entry.copiedCount,
          entry.viewCount,
          entry.likedCount,
          entry.createdAt,
          entry.updatedAt,
          entry.tagValues,
        ),
    );
  }

  async count(search?: string, tags?: string[]): Promise<number> {
    const where: Prisma.SearchPromptEntryWhereInput = {
      isPublic: true,
      status: 'PUBLISHED',
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(tags && tags.length > 0
        ? {
            tagValues: {
              hasSome: tags,
            },
          }
        : {}),
    };

    return this.prisma.searchPromptEntry.count({
      where,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.searchPromptEntry.delete({
      where: {
        id,
      },
    });
  }

  async findByAuthor(
    authorId: string,
    skip: number,
    take: number,
    excludedPromptIds?: string[],
    search?: string,
  ): Promise<SearchPromptEntryView[]> {
    const searchPromptEntries = await this.prisma.searchPromptEntry.findMany({
      where: {
        authorId,
        isPublic: true,
        id: {
          notIn: excludedPromptIds ?? [],
        },
        status: 'PUBLISHED',
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      skip,
      take,
      orderBy: {
        likedCount: 'desc',
      },
    });

    return searchPromptEntries.map(
      (entry) =>
        new SearchPromptEntryView(
          entry.id,
          entry.title,
          entry.content,
          new UserSearchView(
            entry.authorId,
            entry.authorName,
            entry.authorAvatarUrl || undefined,
          ),
          entry.isPublic,
          entry.status,
          entry.copiedCount,
          entry.viewCount,
          entry.likedCount,
          entry.createdAt,
          entry.updatedAt,
          entry.tagValues,
        ),
    );
  }
}
