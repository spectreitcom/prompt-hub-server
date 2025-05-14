import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogRenamedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(CatalogRenamedEvent)
export class CatalogRenamedEventHandler
  implements IEventHandler<CatalogRenamedEvent>
{
  private readonly logger = new Logger(CatalogRenamedEventHandler.name);

  handle(event: CatalogRenamedEvent) {
    this.logger.debug(
      `Catalog ${event.catalogId.getValue()} was renamed to "${event.newName.getValue()}"`,
    );
  }
}
