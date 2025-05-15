import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeletePromptCatalogCommand } from '../commands';
import { PromptCatalogRepository } from '../ports';
import { CatalogId } from '../../domain';

@CommandHandler(DeletePromptCatalogCommand)
export class DeletePromptCatalogCommandHandler
  implements ICommandHandler<DeletePromptCatalogCommand, void>
{
  constructor(
    private readonly promptCatalogRepository: PromptCatalogRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: DeletePromptCatalogCommand): Promise<void> {
    const { catalogId } = command;

    // Find the catalog
    const catalog = await this.promptCatalogRepository.getById(
      CatalogId.create(catalogId),
    );

    if (!catalog) {
      throw new Error(`Catalog with id ${catalogId} not found.`);
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
