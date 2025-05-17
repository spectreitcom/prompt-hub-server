import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptCatalogItemViewRepository } from '../../application';
import { PromptCatalogItemView } from '../../views';

@Injectable()
export class PrismaPromptCatalogItemViewRepository extends PromptCatalogItemViewRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(promptCatalogItemView: PromptCatalogItemView): Promise<void> {
    await this.prisma.promptCatalogItemView.upsert({
      where: {
        promptId_catalogId: {
          promptId: promptCatalogItemView.promptId,
          catalogId: promptCatalogItemView.catalogId,
        },
      },
      update: {
        promptTitle: promptCatalogItemView.promptTitle,
        catalogName: promptCatalogItemView.catalogName,
        addedAt: promptCatalogItemView.addedAt,
      },
      create: {
        promptId: promptCatalogItemView.promptId,
        promptTitle: promptCatalogItemView.promptTitle,
        catalogId: promptCatalogItemView.catalogId,
        catalogName: promptCatalogItemView.catalogName,
        addedAt: promptCatalogItemView.addedAt,
      },
    });
  }

  async findById(id: string): Promise<PromptCatalogItemView> {
    const [promptId, catalogId] = id.split('_');

    const promptCatalogItemView =
      await this.prisma.promptCatalogItemView.findUnique({
        where: {
          promptId_catalogId: {
            promptId,
            catalogId,
          },
        },
      });

    if (!promptCatalogItemView) {
      return null;
    }

    return new PromptCatalogItemView(
      promptCatalogItemView.promptId,
      promptCatalogItemView.promptTitle,
      promptCatalogItemView.catalogId,
      promptCatalogItemView.catalogName,
      promptCatalogItemView.addedAt,
    );
  }

  async delete(promptId: string, catalogId: string): Promise<void> {
    await this.prisma.promptCatalogItemView.delete({
      where: {
        promptId_catalogId: {
          promptId,
          catalogId,
        },
      },
    });
  }

  async deleteByCatalogId(catalogId: string): Promise<void> {
    await this.prisma.promptCatalogItemView.deleteMany({
      where: {
        catalogId,
      },
    });
  }
}
