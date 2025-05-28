import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Tag, TagId, TagValue } from '../../domain';
import { TagRepository } from '../../application/ports';

@Injectable()
export class PrismaTagRepository implements TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(tag: Tag): Promise<void> {
    await this.prisma.tag.upsert({
      where: { id: tag.getId().getValue() },
      update: {
        value: tag.getValue().getValue(),
        isActive: tag.getIsActive(),
      },
      create: {
        id: tag.getId().getValue(),
        value: tag.getValue().getValue(),
        isActive: tag.getIsActive(),
      },
    });
  }

  async findById(id: TagId): Promise<Tag> {
    const tagData = await this.prisma.tag.findUnique({
      where: { id: id.getValue() },
    });

    if (!tagData) {
      throw new Error(`Tag with id ${id.getValue()} not found`);
    }

    return new Tag(
      TagId.create(tagData.id),
      TagValue.create(tagData.value),
      tagData.isActive,
    );
  }

  async findByValue(value: TagValue): Promise<Tag> {
    const tagData = await this.prisma.tag.findUnique({
      where: { value: value.getValue() },
    });

    if (!tagData) {
      throw new Error(`Tag with value ${value.getValue()} not found`);
    }

    return new Tag(
      TagId.create(tagData.id),
      TagValue.create(tagData.value),
      tagData.isActive,
    );
  }

  async existsByValue(value: TagValue): Promise<boolean> {
    const count = await this.prisma.tag.count({
      where: { value: value.getValue() },
    });

    return count > 0;
  }
}
