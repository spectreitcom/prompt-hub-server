import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RenamePromptCatalogCommand } from '../commands';
import { PromptCatalogRepository } from '../ports';
import { CatalogId, CatalogName } from '../../domain';

@CommandHandler(RenamePromptCatalogCommand)
export class RenamePromptCatalogCommandHandler
  implements ICommandHandler<RenamePromptCatalogCommand, void>
{
  constructor(
    private readonly promptCatalogRepository: PromptCatalogRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: RenamePromptCatalogCommand): Promise<void> {
    const { catalogId, newName } = command;

    // Get the catalog by ID
    const catalogIdVO = CatalogId.create(catalogId);
    const catalog =
      await this.promptCatalogRepository.getByIdOrFail(catalogIdVO);

    // Create a new catalog name
    const catalogName = CatalogName.create(newName);

    // Mark the catalog as an event publisher
    const catalogWithEvents = this.eventPublisher.mergeObjectContext(catalog);

    // Rename the catalog
    catalogWithEvents.rename(catalogName);

    // Save the updated catalog
    await this.promptCatalogRepository.save(catalogWithEvents);

    // Commit events after saving
    catalogWithEvents.commit();
  }
}
