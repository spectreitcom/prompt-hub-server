import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AddPromptToCatalogCommand } from '../commands';
import {
  PromptCatalogItemRepository,
  PromptCatalogRepository,
  PromptRepository,
} from '../ports';
import { CatalogId, PromptCatalogItem, PromptId } from '../../domain';

@CommandHandler(AddPromptToCatalogCommand)
export class AddPromptToCatalogCommandHandler
  implements ICommandHandler<AddPromptToCatalogCommand, void>
{
  constructor(
    private readonly promptCatalogRepository: PromptCatalogRepository,
    private readonly promptRepository: PromptRepository,
    private readonly promptCatalogItemRepository: PromptCatalogItemRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: AddPromptToCatalogCommand): Promise<void> {
    const { catalogId, promptId } = command;

    // Check if catalog exists
    const catalog = await this.promptCatalogRepository.getById(
      CatalogId.create(catalogId),
    );

    if (!catalog) {
      throw new Error(`Catalog with id ${catalogId} not found.`);
    }

    // Check if prompt exists
    const prompt = await this.promptRepository.getById(
      PromptId.create(promptId),
    );

    if (!prompt) {
      throw new Error(`Prompt with id ${promptId} not found.`);
    }

    // Check if prompt is already in catalog
    const exists = await this.promptCatalogItemRepository.existsInCatalog(
      CatalogId.create(catalogId),
      PromptId.create(promptId),
    );

    if (exists) {
      throw new Error(
        `Prompt with id ${promptId} is already in catalog with id ${catalogId}.`,
      );
    }

    // Create a new catalog item
    const catalogItem = PromptCatalogItem.create(
      CatalogId.create(catalogId),
      PromptId.create(promptId),
    );

    // Mark the catalog item as an event publisher
    const catalogItemWithEvents =
      this.eventPublisher.mergeObjectContext(catalogItem);

    // Save the catalog item
    await this.promptCatalogItemRepository.save(catalogItem);

    // Commit events after saving
    catalogItemWithEvents.commit();
  }
}
