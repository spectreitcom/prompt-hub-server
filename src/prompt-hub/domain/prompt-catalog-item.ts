import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import {
  CatalogId,
  CatalogItemTimestamp,
  PromptCatalogItemId,
  PromptId,
} from './value-objects';
import { CatalogItemAddedEvent, CatalogItemRemovedEvent } from './events';

export class PromptCatalogItem extends AggregateRoot {
  private readonly id: PromptCatalogItemId;
  private readonly catalogId: CatalogId;
  private readonly promptId: PromptId;
  private readonly timestamp: CatalogItemTimestamp;

  constructor(
    id: PromptCatalogItemId,
    catalogId: CatalogId,
    promptId: PromptId,
    timestamp: CatalogItemTimestamp,
  ) {
    super();
    this.id = id;
    this.catalogId = catalogId;
    this.promptId = promptId;
    this.timestamp = timestamp;
  }

  static create(catalogId: CatalogId, promptId: PromptId): PromptCatalogItem {
    const id = PromptCatalogItemId.create(randomUUID());
    const timestamp = CatalogItemTimestamp.createNew();

    const catalogItem = new PromptCatalogItem(
      id,
      catalogId,
      promptId,
      timestamp,
    );

    catalogItem.apply(new CatalogItemAddedEvent(id, catalogId, promptId));

    return catalogItem;
  }

  remove(): void {
    this.apply(
      new CatalogItemRemovedEvent(this.id, this.catalogId, this.promptId),
    );
  }

  getId(): PromptCatalogItemId {
    return this.id;
  }

  getCatalogId(): CatalogId {
    return this.catalogId;
  }

  getPromptId(): PromptId {
    return this.promptId;
  }

  getTimestamp(): CatalogItemTimestamp {
    return this.timestamp;
  }
}
