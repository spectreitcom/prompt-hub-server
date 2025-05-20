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

  async findForCatalog(
    catalogId: string,
    skip: number,
    take: number,
    userId: string,
    search?: string,
  ): Promise<PromptCatalogItemView[]> {
    const whereClause: any = {
      catalogId,
    };

    if (search) {
      whereClause.promptTitle = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // If userId is provided, filter by catalog owner
    if (userId) {
      // First, check if the catalog belongs to the user
      const catalog = await this.prisma.promptCatalogView.findFirst({
        where: {
          id: catalogId,
          userId: userId,
        },
      });

      // If the catalog doesn't belong to the user, return an empty array
      if (!catalog) {
        return [];
      }
    }

    const promptCatalogItemViews =
      await this.prisma.promptCatalogItemView.findMany({
        where: whereClause,
        orderBy: {
          addedAt: 'desc',
        },
        skip,
        take,
      });

    return promptCatalogItemViews.map(
      (view) =>
        new PromptCatalogItemView(
          view.promptId,
          view.promptTitle,
          view.catalogId,
          view.catalogName,
          view.addedAt,
        ),
    );
  }
}
