import { IEvent } from '@nestjs/cqrs';
import { CatalogId, UserId } from '../value-objects';

export class CatalogCreatedEvent implements IEvent {
  constructor(
    public readonly catalogId: CatalogId,
    public readonly ownerId: UserId,
  ) {}
}
