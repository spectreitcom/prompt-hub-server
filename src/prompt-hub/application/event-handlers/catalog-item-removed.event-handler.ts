import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogItemRemovedEvent } from '../../domain';
import { PromptCatalogItemViewRepository } from '../ports';

@EventsHandler(CatalogItemRemovedEvent)
export class CatalogItemRemovedEventHandler
  implements IEventHandler<CatalogItemRemovedEvent>
{
  constructor(
    private readonly promptCatalogItemViewRepository: PromptCatalogItemViewRepository,
  ) {}

  async handle(event: CatalogItemRemovedEvent): Promise<void> {
    const { catalogId, promptId } = event;
    await this.promptCatalogItemViewRepository.delete(
      promptId.getValue(),
      catalogId.getValue(),
    );
  }
}
