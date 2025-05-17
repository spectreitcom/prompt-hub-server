import { PromptCatalogItemView } from '../../views';

export abstract class PromptCatalogItemViewRepository {
  abstract save(promptCatalogItemView: PromptCatalogItemView): Promise<void>;
  abstract findById(id: string): Promise<PromptCatalogItemView>;
  abstract delete(promptId: string, catalogId: string): Promise<void>;
}
