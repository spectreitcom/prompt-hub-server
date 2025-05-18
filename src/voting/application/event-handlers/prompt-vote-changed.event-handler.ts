import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteChangedEvent } from '../../domain';
import { PromptVoteEntryViewRepository } from '../ports';
import { PromptVoteEntryView } from '../../views';

@EventsHandler(PromptVoteChangedEvent)
export class PromptVoteChangedEventHandler
  implements IEventHandler<PromptVoteChangedEvent>
{
  constructor(
    private readonly promptVoteEntryViewRepository: PromptVoteEntryViewRepository,
  ) {}

  async handle(event: PromptVoteChangedEvent): Promise<void> {
    const { promptId, userId, newVoteType } = event;

    // Convert vote type to numeric value (1 for UP, -1 for DOWN)
    const voteValue = newVoteType.isUp() ? 1 : -1;

    // Create a new vote entry view with updated vote value
    const promptVoteEntryView = new PromptVoteEntryView(
      userId.getValue(),
      promptId.getValue(),
      voteValue,
      new Date(),
    );

    // Save the updated vote entry view
    await this.promptVoteEntryViewRepository.save(promptVoteEntryView);
  }
}
