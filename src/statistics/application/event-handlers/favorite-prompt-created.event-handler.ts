import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FavoritePromptCreatedEvent } from '../../../favorites/domain';
import {
  PromptDailyStatsViewRepository,
  PromptStatisticsViewRepository,
} from '../ports';

@EventsHandler(FavoritePromptCreatedEvent)
export class FavoritePromptCreatedEventHandler
  implements IEventHandler<FavoritePromptCreatedEvent>
{
  constructor(
    private readonly promptStatisticsViewRepository: PromptStatisticsViewRepository,
    private readonly promptDailyStatsViewRepository: PromptDailyStatsViewRepository,
  ) {}

  async handle(event: FavoritePromptCreatedEvent) {
    const { promptId } = event;
    const promptIdValue = promptId.getValue();

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
