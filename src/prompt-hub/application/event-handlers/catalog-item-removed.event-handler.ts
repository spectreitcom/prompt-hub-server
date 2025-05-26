import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogItemRemovedEvent } from '../../domain';
import {
  PromptCatalogItemViewRepository,
  PromptCatalogViewRepository,
} from '../ports';
import { PromptCatalogView } from '../../views';

@EventsHandler(CatalogItemRemovedEvent)
export class CatalogItemRemovedEventHandler
  implements IEventHandler<CatalogItemRemovedEvent>
{
  constructor(
    private readonly promptCatalogItemViewRepository: PromptCatalogItemViewRepository,
    private readonly promptCatalogViewRepository: PromptCatalogViewRepository,
  ) {}

  async handle(event: CatalogItemRemovedEvent): Promise<void> {
    const { catalogId, promptId } = event;
    await this.promptCatalogItemViewRepository.delete(
      promptId.getValue(),
      catalogId.getValue(),
    );

    const catalogView = await this.promptCatalogViewRepository.findById(
      catalogId.getValue(),
    );
    if (catalogView && catalogView.countItems && catalogView.countItems > 0) {
      const updatedCatalogView = new PromptCatalogView(
        catalogView.id,
        catalogView.name,
        catalogView.userId,
        catalogView.createdAt,
        catalogView.countItems - 1,
      );
      await this.promptCatalogViewRepository.save(updatedCatalogView);
    }
  }
}
