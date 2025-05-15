import { CatalogId, PromptCatalog, UserId } from '../../domain';

export abstract class PromptCatalogRepository {
  abstract getById(id: CatalogId): Promise<PromptCatalog>;
  abstract getByIdOrFail(id: CatalogId): Promise<PromptCatalog>;
  abstract save(catalog: PromptCatalog): Promise<void>;
  abstract exists(id: CatalogId): Promise<boolean>;
  abstract findByOwnerAndName(
    ownerId: UserId,
    name: string,
  ): Promise<PromptCatalog>;
}
