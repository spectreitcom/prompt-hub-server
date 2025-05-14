import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogCreatedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(CatalogCreatedEvent)
export class CatalogCreatedEventHandler
  implements IEventHandler<CatalogCreatedEvent>
{
  private readonly logger = new Logger(CatalogCreatedEventHandler.name);

  handle(event: CatalogCreatedEvent) {
    this.logger.debug(
      `Catalog ${event.catalogId.getValue()} was created by user ${event.ownerId.getValue()}`,
    );
  }
}
