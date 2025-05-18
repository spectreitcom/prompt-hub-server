import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CatalogItemAddedEvent } from '../../domain';
import {
  PromptCatalogRepository,
  PromptRepository,
  PromptCatalogItemViewRepository,
} from '../ports';
import { PromptCatalogItemView } from '../../views';

@EventsHandler(CatalogItemAddedEvent)
export class CatalogItemAddedEventHandler
  implements IEventHandler<CatalogItemAddedEvent>
{
  constructor(
    private readonly promptCatalogItemViewRepository: PromptCatalogItemViewRepository,
    private readonly promptRepository: PromptRepository,
    private readonly promptCatalogRepository: PromptCatalogRepository,
  ) {}

  async handle(event: CatalogItemAddedEvent): Promise<void> {
    const { catalogId, promptId } = event;

    const prompt = await this.promptRepository.getById(promptId);
    const catalog = await this.promptCatalogRepository.getById(catalogId);

    if (!prompt || !catalog) {
      return;
    }

    const promptTitle = prompt.getTitle().getValue();
    const catalogName = catalog.getName().getValue();

    const catalogItemView = new PromptCatalogItemView(
      promptId.getValue(),
      promptTitle,
      catalogId.getValue(),
      catalogName,
      new Date(),
    );

    await this.promptCatalogItemViewRepository.save(catalogItemView);
  }
}
