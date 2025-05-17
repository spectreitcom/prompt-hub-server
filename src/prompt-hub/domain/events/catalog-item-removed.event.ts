import { CatalogId, PromptCatalogItemId, PromptId } from '../value-objects';

export class CatalogItemRemovedEvent {
  constructor(
    public readonly catalogItemId: PromptCatalogItemId,
    public readonly catalogId: CatalogId,
    public readonly promptId: PromptId,
  ) {}
}
