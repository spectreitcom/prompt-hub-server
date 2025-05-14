import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogItemAddedEvent } from '../../domain';
import { Logger } from '@nestjs/common';

@EventsHandler(CatalogItemAddedEvent)
export class CatalogItemAddedEventHandler
  implements IEventHandler<CatalogItemAddedEvent>
{
  private readonly logger = new Logger(CatalogItemAddedEventHandler.name);

  handle(event: CatalogItemAddedEvent) {
    this.logger.debug(
      `Prompt ${event.promptId.getValue()} was added to catalog ${event.catalogId.getValue()} with ID ${event.catalogItemId.getValue()}`,
    );
  }
}
