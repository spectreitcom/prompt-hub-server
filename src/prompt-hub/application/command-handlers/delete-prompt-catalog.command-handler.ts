import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeletePromptCatalogCommand } from '../commands';
import { PromptCatalogRepository } from '../ports';
import {
  CatalogId,
  UserId,
  CatalogNotFoundException,
  UnauthorizedCatalogOperationException,
} from '../../domain';

@CommandHandler(DeletePromptCatalogCommand)
export class DeletePromptCatalogCommandHandler
  implements ICommandHandler<DeletePromptCatalogCommand, void>
{
  constructor(
    private readonly promptCatalogRepository: PromptCatalogRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: DeletePromptCatalogCommand): Promise<void> {
    const { catalogId, userId } = command;

    // Find the catalog
    const catalog = await this.promptCatalogRepository.getById(
      CatalogId.create(catalogId),
    );

    if (!catalog) {
      throw new CatalogNotFoundException(catalogId);
    }

    // Check if the user is the owner of the catalog
    const userIdVO = UserId.create(userId);
    if (!catalog.isOwnedBy(userIdVO)) {
      throw new UnauthorizedCatalogOperationException('delete');
    }

    // Mark the catalog as deleted in the domain model
    catalog.delete();

    // Mark the catalog as an event publisher
    const catalogWithEvents = this.eventPublisher.mergeObjectContext(catalog);

    // Delete the catalog in the repository
    await this.promptCatalogRepository.delete(CatalogId.create(catalogId));

    // Commit events after saving
    catalogWithEvents.commit();
  }
}
