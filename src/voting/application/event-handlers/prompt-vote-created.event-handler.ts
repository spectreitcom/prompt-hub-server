import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteCreatedEvent } from '../../domain';
import { PromptVoteEntryViewRepository } from '../ports';
import { PromptVoteEntryView } from '../../views';

@EventsHandler(PromptVoteCreatedEvent)
export class PromptVoteCreatedEventHandler
  implements IEventHandler<PromptVoteCreatedEvent>
{
  constructor(
    private readonly promptVoteEntryViewRepository: PromptVoteEntryViewRepository,
  ) {}

  async handle(event: PromptVoteCreatedEvent): Promise<void> {
    const { promptId, userId, voteType } = event;

    // Convert vote type to numeric value (1 for UP, -1 for DOWN)
    const voteValue = voteType.isUp() ? 1 : -1;

    // Create a new vote entry view
    const promptVoteEntryView = new PromptVoteEntryView(
      userId.getValue(),
      promptId.getValue(),
      voteValue,
      new Date(),
    );

    // Save the vote entry view
    await this.promptVoteEntryViewRepository.save(promptVoteEntryView);
  }
}
