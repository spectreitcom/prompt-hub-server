import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptCreatedEvent } from '../../../prompt-hub/domain';
import { PromptStatisticsAuthorViewRepository } from '../ports';
import { PromptStatisticsAuthorView } from '../../views';

@EventsHandler(PromptCreatedEvent)
export class PromptCreatedEventHandler
  implements IEventHandler<PromptCreatedEvent>
{
  constructor(
    private readonly promptStatisticsAuthorViewRepository: PromptStatisticsAuthorViewRepository,
  ) {}

  async handle(event: PromptCreatedEvent) {
    const { promptId, authorId } = event;
    const promptIdValue = promptId.getValue();
    const authorIdValue = authorId.getValue();

    const promptStatisticsAuthorView = new PromptStatisticsAuthorView(
      promptIdValue,
      authorIdValue,
    );

    await this.promptStatisticsAuthorViewRepository.save(
      promptStatisticsAuthorView,
    );
  }
}
