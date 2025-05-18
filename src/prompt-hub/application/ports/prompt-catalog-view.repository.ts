import { PromptCatalogView } from '../../views';

export abstract class PromptCatalogViewRepository {
  abstract save(promptCatalogView: PromptCatalogView): Promise<void>;
  abstract findById(id: string): Promise<PromptCatalogView>;
  abstract delete(id: string): Promise<void>;
  abstract findForUser(userId: string): Promise<PromptCatalogView[]>;
}
