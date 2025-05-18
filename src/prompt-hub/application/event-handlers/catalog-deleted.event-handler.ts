import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogDeletedEvent } from '../../domain';
import { PromptCatalogItemViewRepository } from '../ports';

@EventsHandler(CatalogDeletedEvent)
export class CatalogDeletedEventHandler
  implements IEventHandler<CatalogDeletedEvent>
{
  constructor(
    private readonly promptCatalogItemViewRepository: PromptCatalogItemViewRepository,
  ) {}

  async handle(event: CatalogDeletedEvent): Promise<void> {
    const catalogId = event.catalogId.getValue();

    await this.promptCatalogItemViewRepository.deleteByCatalogId(catalogId);
  }
}
