import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptCopiedEvent } from '../../../prompt-hub/domain';
import {
  PromptDailyStatsViewRepository,
  PromptStatisticsViewRepository,
} from '../ports';

@EventsHandler(PromptCopiedEvent)
export class PromptCopiedEventHandler
  implements IEventHandler<PromptCopiedEvent>
{
  constructor(
    private readonly promptStatisticsViewRepository: PromptStatisticsViewRepository,
    private readonly promptDailyStatsViewRepository: PromptDailyStatsViewRepository,
  ) {}

  async handle(event: PromptCopiedEvent) {
    const { promptId, authorId, byUserId } = event;

    // Perform the logic if user is guest or the user is not owner of the prompt
    if (!byUserId || byUserId !== authorId) {
      const promptIdValue = promptId.getValue();

      // Update overall statistics
      await this.promptStatisticsViewRepository.incrementCopiedCount(
        promptIdValue,
      );

      // Update daily statistics
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day

      // Format: promptId_YYYY-MM-DD
      const dateStr = today.toISOString().split('T')[0]; // Get YYYY-MM-DD part
      const dailyStatsId = `${promptIdValue}_${dateStr}`;

      await this.promptDailyStatsViewRepository.incrementCopiedCount(
        dailyStatsId,
      );
    }
  }
}
