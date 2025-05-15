import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemovePromptFromCatalogCommand } from '../commands';
import { PromptCatalogItemRepository } from '../ports';
import { CatalogId, PromptId } from '../../domain';

@CommandHandler(RemovePromptFromCatalogCommand)
export class RemovePromptFromCatalogCommandHandler
  implements ICommandHandler<RemovePromptFromCatalogCommand, void>
{
  constructor(
    private readonly promptCatalogItemRepository: PromptCatalogItemRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: RemovePromptFromCatalogCommand): Promise<void> {
    const { catalogId, promptId } = command;

    // Find the catalog item
    const catalogItem =
      await this.promptCatalogItemRepository.findByCatalogAndPrompt(
        CatalogId.create(catalogId),
        PromptId.create(promptId),
      );

    if (!catalogItem) {
      throw new Error(
        `Prompt with id ${promptId} not found in catalog with id ${catalogId}.`,
      );
    }

    // Mark the catalog item as removed in the domain model
    catalogItem.remove();

    // Mark the catalog item as an event publisher
    const catalogItemWithEvents =
      this.eventPublisher.mergeObjectContext(catalogItem);

    // Delete the catalog item in the repository
    await this.promptCatalogItemRepository.delete(catalogItem.getId());

    // Commit events after saving
    catalogItemWithEvents.commit();
  }
}
