import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { TagEntryViewRepository } from '../../application';
import { TagEntryView } from '../../views';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaTagEntryViewRepository extends TagEntryViewRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(tag: TagEntryView): Promise<void> {
    await this.prisma.tagView.upsert({
      where: {
        id: tag.id,
      },
      update: {
        value: tag.value,
        isActive: tag.isActive,
        usageCount: tag.usageCount,
      },
      create: {
        id: tag.id,
        value: tag.value,
        isActive: tag.isActive,
        usageCount: tag.usageCount,
      },
    });
  }

  async incrementUsage(tagValue: string): Promise<void> {
    const tag = await this.prisma.tagView.findFirst({
      where: {
        value: tagValue,
      },
    });

    if (tag) {
      await this.prisma.tagView.update({
        where: {
          id: tag.id,
        },
        data: {
          usageCount: {
            increment: 1,
          },
        },
      });
    }
  }

  async decrementUsage(tagValue: string): Promise<void> {
    const tag = await this.prisma.tagView.findFirst({
      where: {
        value: tagValue,
      },
    });

    if (tag) {
      await this.prisma.tagView.update({
        where: {
          id: tag.id,
        },
        data: {
          usageCount: {
            decrement: 1,
          },
        },
      });
    }
  }

  async deactivate(id: string): Promise<void> {
    await this.prisma.tagView.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }

  async findById(id: string): Promise<TagEntryView> {
    const tag = await this.prisma.tagView.findUnique({
      where: {
        id,
      },
    });

    if (!tag) {
      return null;
    }

    return new TagEntryView(tag.id, tag.value, tag.isActive, tag.usageCount);
  }

  async getPopularTags(
    skip: number,
    take: number,
    search?: string,
  ): Promise<TagEntryView[]> {
    const where: Prisma.TagViewWhereInput = {
      ...(search
        ? {
            value: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : {}),
    };

    const tags = await this.prisma.tagView.findMany({
      where,
      orderBy: {
        usageCount: 'desc',
      },
      skip,
      take,
    });

    return tags.map(
      (tag) =>
        new TagEntryView(tag.id, tag.value, tag.isActive, tag.usageCount),
    );
  }
}
