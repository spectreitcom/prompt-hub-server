import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptCatalogViewRepository } from '../../application';
import { PromptCatalogView } from '../../views';

@Injectable()
export class PrismaPromptCatalogViewRepository extends PromptCatalogViewRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(promptCatalogView: PromptCatalogView): Promise<void> {
    await this.prisma.promptCatalogView.upsert({
      where: {
        id: promptCatalogView.id,
      },
      update: {
        name: promptCatalogView.name,
        userId: promptCatalogView.userId,
        createdAt: promptCatalogView.createdAt,
      },
      create: {
        id: promptCatalogView.id,
        name: promptCatalogView.name,
        userId: promptCatalogView.userId,
        createdAt: promptCatalogView.createdAt,
      },
    });
  }

  async findById(id: string): Promise<PromptCatalogView> {
    const promptCatalogView = await this.prisma.promptCatalogView.findUnique({
      where: {
        id,
      },
    });

    if (!promptCatalogView) {
      return null;
    }

    return new PromptCatalogView(
      promptCatalogView.id,
      promptCatalogView.name,
      promptCatalogView.userId,
      promptCatalogView.createdAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.promptCatalogView.delete({
      where: {
        id,
      },
    });
  }
}
