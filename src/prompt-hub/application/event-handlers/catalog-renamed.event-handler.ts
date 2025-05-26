import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogRenamedEvent } from '../../domain';
import { PromptCatalogViewRepository } from '../ports';
import { PromptCatalogView } from '../../views';

@EventsHandler(CatalogRenamedEvent)
export class CatalogRenamedEventHandler
  implements IEventHandler<CatalogRenamedEvent>
{
  constructor(
    private readonly promptCatalogViewRepository: PromptCatalogViewRepository,
  ) {}

  async handle(event: CatalogRenamedEvent): Promise<void> {
    const catalogId = event.catalogId.getValue();
    const existingCatalog =
      await this.promptCatalogViewRepository.findById(catalogId);

    if (!existingCatalog) {
      return;
    }

    const updatedCatalog = new PromptCatalogView(
      existingCatalog.id,
      event.newName.getValue(),
      existingCatalog.userId,
      existingCatalog.createdAt,
      existingCatalog.countItems,
    );

    await this.promptCatalogViewRepository.save(updatedCatalog);
  }
}
