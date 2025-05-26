import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogCreatedEvent } from '../../domain';
import { PromptCatalogViewRepository } from '../ports';
import { PromptCatalogView } from '../../views';

@EventsHandler(CatalogCreatedEvent)
export class CatalogCreatedEventHandler
  implements IEventHandler<CatalogCreatedEvent>
{
  constructor(
    private readonly promptCatalogViewRepository: PromptCatalogViewRepository,
  ) {}

  async handle(event: CatalogCreatedEvent): Promise<void> {
    const catalogView = new PromptCatalogView(
      event.catalogId.getValue(),
      event.name.getValue(),
      event.ownerId.getValue(),
      new Date(),
      0,
    );

    await this.promptCatalogViewRepository.save(catalogView);
  }
}
