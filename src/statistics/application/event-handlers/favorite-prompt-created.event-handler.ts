import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FavoritePromptCreatedEvent } from '../../../favorites/domain';
import {
  PromptDailyStatsViewRepository,
  PromptStatisticsAuthorViewRepository,
  PromptStatisticsViewRepository,
} from '../ports';

@EventsHandler(FavoritePromptCreatedEvent)
export class FavoritePromptCreatedEventHandler
  implements IEventHandler<FavoritePromptCreatedEvent>
{
  constructor(
    private readonly promptStatisticsViewRepository: PromptStatisticsViewRepository,
    private readonly promptDailyStatsViewRepository: PromptDailyStatsViewRepository,
    private readonly promptStatisticsAuthorViewRepository: PromptStatisticsAuthorViewRepository,
  ) {}

  async handle(event: FavoritePromptCreatedEvent) {
    const { promptId, userId } = event;
    const promptIdValue = promptId.getValue();
    const userIdValue = userId.getValue();

    const promptStatisticsAuthorView =
      await this.promptStatisticsAuthorViewRepository.findByPromptId(
        promptIdValue,
      );

    // If we can't find author information or the user is a guest or the user is not the author
    if (
      !promptStatisticsAuthorView ||
      !userIdValue ||
      userIdValue !== promptStatisticsAuthorView.authorId
    ) {
      // Update overall statistics
      await this.promptStatisticsViewRepository.incrementFavoritesCount(
        promptIdValue,
      );

      // Update daily statistics
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day

      // Format: promptId_YYYY-MM-DD
      const dateStr = today.toISOString().split('T')[0]; // Get YYYY-MM-DD part
      const dailyStatsId = `${promptIdValue}_${dateStr}`;

      await this.promptDailyStatsViewRepository.incrementFavoritesCount(
        dailyStatsId,
      );
    }
  }
}
