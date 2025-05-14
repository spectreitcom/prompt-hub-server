import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogItemRemovedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(CatalogItemRemovedEvent)
export class CatalogItemRemovedEventHandler
  implements IEventHandler<CatalogItemRemovedEvent>
{
  private readonly logger = new Logger(CatalogItemRemovedEventHandler.name);

  handle(event: CatalogItemRemovedEvent) {
    this.logger.debug(
      `Catalog item ${event.catalogItemId.getValue()} was removed`,
    );
  }
}
