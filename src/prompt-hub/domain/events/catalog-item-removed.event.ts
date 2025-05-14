import { PromptCatalogItemId } from '../value-objects';

export class CatalogItemRemovedEvent {
  constructor(public readonly catalogItemId: PromptCatalogItemId) {}
}
