import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptRepository } from '../../application';
import {
  Prompt,
  PromptId,
  PromptTitle,
  PromptContent,
  PromptStatus,
  PromptVisibility,
  PromptTimestamps,
  UserId,
  TagValue,
} from '../../domain';

@Injectable()
export class PrismaPromptRepository implements PromptRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: PromptId): Promise<void> {
    await this.prisma.prompt.delete({
      where: { id: id.getValue() },
    });
  }

  async exists(id: PromptId): Promise<boolean> {
    const count = await this.prisma.prompt.count({
      where: {
        id: id.getValue(),
        isDeleted: false,
      },
    });
    return count > 0;
  }

  async getById(id: PromptId): Promise<Prompt | null> {
    const promptData = await this.prisma.prompt.findFirst({
      where: {
        id: id.getValue(),
        isDeleted: false,
      },
      include: {
        promptTags: true,
      },
    });

    if (!promptData) {
      return null;
    }

    return this.mapToDomain(promptData);
  }

  async getByIdOrFail(id: PromptId): Promise<Prompt> {
    const prompt = await this.getById(id);

    if (!prompt) {
      throw new NotFoundException(`Prompt with ID ${id.getValue()} not found`);
    }

    return prompt;
  }

  async save(prompt: Prompt): Promise<void> {
    const promptId = prompt.getId().getValue();
    const tags = prompt.getTags();

    // Use a transaction to ensure all operations succeed or fail together
    await this.prisma.$transaction(async (tx) => {
      // Save the prompt
      await tx.prompt.upsert({
        where: { id: promptId },
        update: {
          title: prompt.getTitle().getValue(),
          content: prompt.getContent().getValue(),
          status: prompt.getStatus().getValue(),
          isPublic: prompt.getVisibility().isPublic(),
          updatedAt: prompt.getTimestamps().getUpdatedAt(),
        },
        create: {
          id: promptId,
          title: prompt.getTitle().getValue(),
          content: prompt.getContent().getValue(),
          status: prompt.getStatus().getValue(),
          isPublic: prompt.getVisibility().isPublic(),
          authorId: prompt.getAuthorId().getValue(),
          createdAt: prompt.getTimestamps().getCreatedAt(),
          updatedAt: prompt.getTimestamps().getUpdatedAt(),
        },
      });

      // Delete existing tags for this prompt
      await tx.promptTag.deleteMany({
        where: { promptId },
      });

      // Add new tags
      if (tags.length > 0) {
        await tx.promptTag.createMany({
          data: tags.map((tag) => ({
            promptId,
            tagValue: tag.getValue(),
          })),
          skipDuplicates: true,
        });
      }
    });
  }

  private mapToDomain(promptData: any): Prompt {
    const tags = promptData.PromptTag
      ? promptData.PromptTag.map((tag: any) => TagValue.create(tag.tagValue))
      : [];

    return new Prompt(
      PromptId.create(promptData.id),
      PromptTitle.create(promptData.title),
      PromptContent.create(promptData.content),
      PromptStatus[promptData.status === 'DRAFT' ? 'draft' : 'published'](),
      PromptVisibility.fromBoolean(promptData.isPublic),
      UserId.create(promptData.authorId),
      PromptTimestamps.create(promptData.createdAt, promptData.updatedAt),
      tags,
    );
  }

  async softDelete(id: PromptId): Promise<void> {
    await this.prisma.prompt.update({
      where: { id: id.getValue() },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
