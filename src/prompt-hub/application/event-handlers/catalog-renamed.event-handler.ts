import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogRenamedEvent } from '../../domain';

@EventsHandler(CatalogRenamedEvent)
export class CatalogRenamedEventHandler
  implements IEventHandler<CatalogRenamedEvent>
{
  handle(event: CatalogRenamedEvent) {}
}
