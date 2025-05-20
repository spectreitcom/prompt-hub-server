import { PromptCatalogItemView } from '../../views';

export abstract class PromptCatalogItemViewRepository {
  abstract save(promptCatalogItemView: PromptCatalogItemView): Promise<void>;
  abstract findById(id: string): Promise<PromptCatalogItemView>;
  abstract delete(promptId: string, catalogId: string): Promise<void>;
  abstract deleteByCatalogId(catalogId: string): Promise<void>;
  abstract findForCatalog(
    catalogId: string,
    skip: number,
    take: number,
    userId: string,
    search?: string,
  ): Promise<PromptCatalogItemView[]>;
}
