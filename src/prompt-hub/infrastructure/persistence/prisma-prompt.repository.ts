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
    await this.prisma.prompt.upsert({
      where: { id: prompt.getId().getValue() },
      update: {
        title: prompt.getTitle().getValue(),
        content: prompt.getContent().getValue(),
        status: prompt.getStatus().getValue(),
        isPublic: prompt.getVisibility().isPublic,
        updatedAt: prompt.getTimestamps().getUpdatedAt(),
      },
      create: {
        id: prompt.getId().getValue(),
        title: prompt.getTitle().getValue(),
        content: prompt.getContent().getValue(),
        status: prompt.getStatus().getValue(),
        isPublic: prompt.getVisibility().isPublic,
        authorId: prompt.getAuthorId().getValue(),
        createdAt: prompt.getTimestamps().getCreatedAt(),
        updatedAt: prompt.getTimestamps().getUpdatedAt(),
      },
    });
  }

  private mapToDomain(promptData: any): Prompt {
    return new Prompt(
      PromptId.create(promptData.id),
      PromptTitle.create(promptData.title),
      PromptContent.create(promptData.content),
      PromptStatus[promptData.status === 'DRAFT' ? 'draft' : 'published'](),
      PromptVisibility.fromBoolean(promptData.isPublic),
      UserId.create(promptData.authorId),
      PromptTimestamps.create(promptData.createdAt, promptData.updatedAt),
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
