import {
  CatalogId,
  PromptCatalogItem,
  PromptCatalogItemId,
  PromptId,
} from '../../domain';

export abstract class PromptCatalogItemRepository {
  abstract save(item: PromptCatalogItem): Promise<void>;
  abstract delete(id: PromptCatalogItemId): Promise<void>;
  abstract existsInCatalog(
    catalogId: CatalogId,
    promptId: PromptId,
  ): Promise<boolean>;
  abstract findByCatalogAndPrompt(
    catalogId: CatalogId,
    promptId: PromptId,
  ): Promise<PromptCatalogItem>;
}
