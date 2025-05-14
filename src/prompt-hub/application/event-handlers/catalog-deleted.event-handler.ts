import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogDeletedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(CatalogDeletedEvent)
export class CatalogDeletedEventHandler
  implements IEventHandler<CatalogDeletedEvent>
{
  private readonly logger = new Logger(CatalogDeletedEventHandler.name);

  handle(event: CatalogDeletedEvent) {
    this.logger.debug(`Catalog ${event.catalogId.getValue()} was deleted`);
  }
}
