import { AggregateRoot } from '@nestjs/cqrs';
import {
  CatalogId,
  CatalogName,
  CatalogTimestamps,
  UserId,
} from './value-objects';
import { randomUUID } from 'crypto';
import {
  CatalogCreatedEvent,
  CatalogDeletedEvent,
  CatalogRenamedEvent,
} from './events';

export class PromptCatalog extends AggregateRoot {
  private readonly id: CatalogId;
  private name: CatalogName;
  private readonly ownerId: UserId;
  private timestamps: CatalogTimestamps;

  constructor(
    id: CatalogId,
    name: CatalogName,
    ownerId: UserId,
    timestamps: CatalogTimestamps,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.timestamps = timestamps;
  }

  static create(name: CatalogName, ownerId: UserId): PromptCatalog {
    const catalog = new PromptCatalog(
      CatalogId.create(randomUUID()),
      name,
      ownerId,
      CatalogTimestamps.createNew(),
    );

    catalog.apply(new CatalogCreatedEvent(catalog.id, catalog.ownerId));

    return catalog;
  }

  rename(newName: CatalogName): void {
    if (this.name.equals(newName)) {
      return;
    }

    this.name = newName;
    this.timestamps = this.timestamps.withUpdatedAt(new Date());

    this.apply(new CatalogRenamedEvent(this.id, this.name));
  }

  delete(): void {
    this.apply(new CatalogDeletedEvent(this.id));
  }

  isOwnedBy(userId: UserId): boolean {
    return this.ownerId.equals(userId);
  }

  getId(): CatalogId {
    return this.id;
  }

  getName(): CatalogName {
    return this.name;
  }

  getOwnerId(): UserId {
    return this.ownerId;
  }

  getTimestamps(): CatalogTimestamps {
    return this.timestamps;
  }
}
