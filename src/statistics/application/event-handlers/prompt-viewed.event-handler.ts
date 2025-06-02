import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptViewedEvent } from '../../../prompt-hub/domain';
import {
  PromptDailyStatsViewRepository,
  PromptStatisticsAuthorViewRepository,
  PromptStatisticsViewRepository,
} from '../ports';

@EventsHandler(PromptViewedEvent)
export class PromptViewedEventHandler
  implements IEventHandler<PromptViewedEvent>
{
  constructor(
    private readonly promptStatisticsViewRepository: PromptStatisticsViewRepository,
    private readonly promptDailyStatsViewRepository: PromptDailyStatsViewRepository,
    private readonly promptStatisticsAuthorViewRepository: PromptStatisticsAuthorViewRepository,
  ) {}

  async handle(event: PromptViewedEvent) {
    const { promptId, byUserId } = event;
    const promptIdValue = promptId.getValue();

    const promptStatisticsAuthorView =
      await this.promptStatisticsAuthorViewRepository.findByPromptId(
        promptIdValue,
      );

    // If we can't find author information or the user is a guest or the user is not the author
    if (
      !promptStatisticsAuthorView ||
      !byUserId ||
      byUserId.getValue() !== promptStatisticsAuthorView.authorId
    ) {
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
