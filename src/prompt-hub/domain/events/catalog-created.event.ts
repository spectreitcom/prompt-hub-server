import { IEvent } from '@nestjs/cqrs';
import { CatalogId, CatalogName, UserId } from '../value-objects';

export class CatalogCreatedEvent implements IEvent {
  constructor(
    public readonly catalogId: CatalogId,
    public readonly ownerId: UserId,
    public readonly name: CatalogName,
  ) {}
}
