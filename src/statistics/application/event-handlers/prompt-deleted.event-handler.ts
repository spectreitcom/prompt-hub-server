import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptDeletedEvent } from '../../../prompt-hub/domain';
import {
  PromptDailyStatsViewRepository,
  PromptStatisticsViewRepository,
} from '../ports';

@EventsHandler(PromptDeletedEvent)
export class PromptDeletedEventHandler
  implements IEventHandler<PromptDeletedEvent>
{
  constructor(
    private readonly promptStatisticsViewRepository: PromptStatisticsViewRepository,
    private readonly promptDailyStatsViewRepository: PromptDailyStatsViewRepository,
  ) {}

  async handle(event: PromptDeletedEvent) {
    const { promptId } = event;
    const promptIdValue = promptId.getValue();

    // Delete overall statistics
    await this.promptStatisticsViewRepository.delete(promptIdValue);

    // Delete daily statistics
    await this.promptDailyStatsViewRepository.deleteByPromptId(promptIdValue);
  }
}
