import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemovePromptFromCatalogCommand } from '../commands';
import { PromptCatalogItemRepository, PromptCatalogRepository } from '../ports';
import {
  CatalogId,
  PromptId,
  UserId,
  UnauthorizedCatalogOperationException,
  PromptNotFoundInCatalogException,
} from '../../domain';

@CommandHandler(RemovePromptFromCatalogCommand)
export class RemovePromptFromCatalogCommandHandler
  implements ICommandHandler<RemovePromptFromCatalogCommand, void>
{
  constructor(
    private readonly promptCatalogItemRepository: PromptCatalogItemRepository,
    private readonly promptCatalogRepository: PromptCatalogRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: RemovePromptFromCatalogCommand): Promise<void> {
    const { catalogId, promptId, userId } = command;

    // Get the catalog by ID
    const catalogIdVO = CatalogId.create(catalogId);
    const catalog =
      await this.promptCatalogRepository.getByIdOrFail(catalogIdVO);

    // Check if the user is the owner of the catalog
    const userIdVO = UserId.create(userId);
    if (!catalog.isOwnedBy(userIdVO)) {
      throw new UnauthorizedCatalogOperationException('remove prompts from');
    }

    // Find the catalog item
    const catalogItem =
      await this.promptCatalogItemRepository.findByCatalogAndPrompt(
        catalogIdVO,
        PromptId.create(promptId),
      );

    if (!catalogItem) {
      throw new PromptNotFoundInCatalogException(promptId, catalogId);
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
