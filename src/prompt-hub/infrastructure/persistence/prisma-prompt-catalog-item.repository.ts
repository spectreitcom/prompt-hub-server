import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptCatalogItemRepository } from '../../application';
import {
  CatalogId,
  CatalogItemTimestamp,
  PromptCatalogItem,
  PromptCatalogItemId,
  PromptId,
} from '../../domain';

@Injectable()
export class PrismaPromptCatalogItemRepository
  implements PromptCatalogItemRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: PromptCatalogItemId): Promise<void> {
    await this.prisma.promptCatalogItem.delete({
      where: {
        id: id.getValue(),
      },
    });
  }

  async existsInCatalog(
    catalogId: CatalogId,
    promptId: PromptId,
  ): Promise<boolean> {
    const count = await this.prisma.promptCatalogItem.count({
      where: {
        catalogId: catalogId.getValue(),
        promptId: promptId.getValue(),
      },
    });
    return count > 0;
  }

  async findByCatalogAndPrompt(
    catalogId: CatalogId,
    promptId: PromptId,
  ): Promise<PromptCatalogItem> {
    const catalogItemData = await this.prisma.promptCatalogItem.findFirst({
      where: {
        catalogId: catalogId.getValue(),
        promptId: promptId.getValue(),
      },
    });

    if (!catalogItemData) {
      return null;
    }

    return this.mapToDomain(catalogItemData);
  }

  async save(item: PromptCatalogItem): Promise<void> {
    await this.prisma.promptCatalogItem.upsert({
      where: { id: item.getId().getValue() },
      update: {
        catalogId: item.getCatalogId().getValue(),
        promptId: item.getPromptId().getValue(),
      },
      create: {
        id: item.getId().getValue(),
        catalogId: item.getCatalogId().getValue(),
        promptId: item.getPromptId().getValue(),
        addedAt: item.getTimestamp().getAddedAt(),
      },
    });
  }

  private mapToDomain(catalogItemData: any): PromptCatalogItem {
    return new PromptCatalogItem(
      PromptCatalogItemId.create(catalogItemData.id),
      CatalogId.create(catalogItemData.catalogId),
      PromptId.create(catalogItemData.promptId),
      CatalogItemTimestamp.create(catalogItemData.addedAt),
    );
  }
}
