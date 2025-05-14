import { IEvent } from '@nestjs/cqrs';
import { CatalogId, CatalogName } from '../value-objects';

export class CatalogRenamedEvent implements IEvent {
  constructor(
    public readonly catalogId: CatalogId,
    public readonly newName: CatalogName,
  ) {}
}
