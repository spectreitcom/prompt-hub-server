import { IEvent } from '@nestjs/cqrs';
import { CatalogId } from '../value-objects';

export class CatalogDeletedEvent implements IEvent {
  constructor(public readonly catalogId: CatalogId) {}
}
