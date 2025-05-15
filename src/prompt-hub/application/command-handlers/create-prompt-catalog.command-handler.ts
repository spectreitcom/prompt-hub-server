import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePromptCatalogCommand } from '../commands';
import { PromptCatalogRepository } from '../ports';
import { CatalogName, PromptCatalog, UserId } from '../../domain';

@CommandHandler(CreatePromptCatalogCommand)
export class CreatePromptCatalogCommandHandler
  implements ICommandHandler<CreatePromptCatalogCommand, void>
{
  constructor(
    private readonly promptCatalogRepository: PromptCatalogRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreatePromptCatalogCommand): Promise<void> {
    const { ownerId, name } = command;

    // Create a new catalog
    const userId = UserId.create(ownerId);
    const catalogName = CatalogName.create(name);
    const catalog = PromptCatalog.create(catalogName, userId);

    // Mark the catalog as an event publisher
    const catalogWithEvents = this.eventPublisher.mergeObjectContext(catalog);

    // Save the catalog
    await this.promptCatalogRepository.save(catalogWithEvents);

    // Commit events after saving
    catalogWithEvents.commit();
  }
}
