import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogDeletedEvent } from '../../domain';
import {
  PromptCatalogItemViewRepository,
  PromptCatalogViewRepository,
} from '../ports';

@EventsHandler(CatalogDeletedEvent)
export class CatalogDeletedEventHandler
  implements IEventHandler<CatalogDeletedEvent>
{
  constructor(
    private readonly promptCatalogItemViewRepository: PromptCatalogItemViewRepository,
    private readonly promptCatalogViewRepository: PromptCatalogViewRepository,
  ) {}

  async handle(event: CatalogDeletedEvent): Promise<void> {
    const catalogId = event.catalogId.getValue();
    await this.promptCatalogViewRepository.delete(catalogId);
    await this.promptCatalogItemViewRepository.deleteByCatalogId(catalogId);
  }
}
