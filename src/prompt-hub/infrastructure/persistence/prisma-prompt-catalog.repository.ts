import { Injectable } from '@nestjs/common';
import { PromptCatalogRepository } from '../../application';
import { CatalogId, PromptCatalog, UserId } from '../../domain';

@Injectable()
export class PrismaPromptCatalogRepository implements PromptCatalogRepository {
  exists(id: CatalogId): Promise<boolean> {
    return Promise.resolve(false);
  }

  findByOwnerAndName(ownerId: UserId, name: string): Promise<PromptCatalog> {
    return Promise.resolve(undefined);
  }

  getById(id: CatalogId): Promise<PromptCatalog> {
    return Promise.resolve(undefined);
  }

  getByIdOrFail(id: CatalogId): Promise<PromptCatalog> {
    return Promise.resolve(undefined);
  }

  save(catalog: PromptCatalog): Promise<void> {
    return Promise.resolve(undefined);
  }
}
