import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptCatalogRepository } from '../../application';
import {
  CatalogId,
  CatalogName,
  CatalogTimestamps,
  PromptCatalog,
  UserId,
} from '../../domain';

@Injectable()
export class PrismaPromptCatalogRepository implements PromptCatalogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exists(id: CatalogId): Promise<boolean> {
    const count = await this.prisma.promptCatalog.count({
      where: {
        id: id.getValue(),
      },
    });
    return count > 0;
  }

  async findByOwnerAndName(
    ownerId: UserId,
    name: string,
  ): Promise<PromptCatalog> {
    const catalogData = await this.prisma.promptCatalog.findFirst({
      where: {
        ownerId: ownerId.getValue(),
        name: name,
      },
    });

    if (!catalogData) {
      return null;
    }

    return this.mapToDomain(catalogData);
  }

  async getById(id: CatalogId): Promise<PromptCatalog> {
    const catalogData = await this.prisma.promptCatalog.findUnique({
      where: {
        id: id.getValue(),
      },
    });

    if (!catalogData) {
      return null;
    }

    return this.mapToDomain(catalogData);
  }

  async getByIdOrFail(id: CatalogId): Promise<PromptCatalog> {
    const catalog = await this.getById(id);

    if (!catalog) {
      throw new NotFoundException(`Catalog with ID ${id.getValue()} not found`);
    }

    return catalog;
  }

  async save(catalog: PromptCatalog): Promise<void> {
    await this.prisma.promptCatalog.upsert({
      where: { id: catalog.getId().getValue() },
      update: {
        name: catalog.getName().getValue(),
      },
      create: {
        id: catalog.getId().getValue(),
        name: catalog.getName().getValue(),
        ownerId: catalog.getOwnerId().getValue(),
        createdAt: catalog.getTimestamps().getCreatedAt(),
      },
    });
  }

  private mapToDomain(catalogData: any): PromptCatalog {
    return new PromptCatalog(
      CatalogId.create(catalogData.id),
      CatalogName.create(catalogData.name),
      UserId.create(catalogData.ownerId),
      CatalogTimestamps.create(catalogData.createdAt, catalogData.createdAt),
    );
  }
}
