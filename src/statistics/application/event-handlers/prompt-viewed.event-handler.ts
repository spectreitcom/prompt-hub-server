import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptViewedEvent } from '../../../prompt-hub/domain';
import {
  PromptDailyStatsViewRepository,
  PromptStatisticsViewRepository,
} from '../ports';

@EventsHandler(PromptViewedEvent)
export class PromptViewedEventHandler
  implements IEventHandler<PromptViewedEvent>
{
  constructor(
    private readonly promptStatisticsViewRepository: PromptStatisticsViewRepository,
    private readonly promptDailyStatsViewRepository: PromptDailyStatsViewRepository,
  ) {}

  async handle(event: PromptViewedEvent) {
    const { promptId, authorId, byUserId } = event;

    // Perform the logic if user is guest or the user is not owner of the prompt
    if (!byUserId || byUserId !== authorId) {
      const promptIdValue = promptId.getValue();

      // Update overall statistics
      await this.promptStatisticsViewRepository.incrementViewCount(
        promptIdValue,
      );

      // Update daily statistics
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day

      // Format: promptId_YYYY-MM-DD
      const dateStr = today.toISOString().split('T')[0]; // Get YYYY-MM-DD part
      const dailyStatsId = `${promptIdValue}_${dateStr}`;

      await this.promptDailyStatsViewRepository.incrementViewCount(
        dailyStatsId,
      );
    }
  }
}
