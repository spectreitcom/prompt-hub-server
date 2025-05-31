import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptCopiedEvent } from '../../../prompt-hub/domain';
import {
  PromptDailyStatsViewRepository,
  PromptStatisticsViewRepository,
  PromptStatisticsAuthorViewRepository,
} from '../ports';

@EventsHandler(PromptCopiedEvent)
export class PromptCopiedEventHandler
  implements IEventHandler<PromptCopiedEvent>
{
  constructor(
    private readonly promptStatisticsViewRepository: PromptStatisticsViewRepository,
    private readonly promptDailyStatsViewRepository: PromptDailyStatsViewRepository,
    private readonly promptStatisticsAuthorViewRepository: PromptStatisticsAuthorViewRepository,
  ) {}

  async handle(event: PromptCopiedEvent) {
    const { promptId, byUserId } = event;
    const promptIdValue = promptId.getValue();

    const promptStatisticsAuthorView =
      await this.promptStatisticsAuthorViewRepository.findByPromptId(
        promptIdValue,
      );

    const { authorId } = promptStatisticsAuthorView || { authorId: null };

    // Increment statistics only if user is guest or is not author of the prompt
    if (!byUserId || !authorId || byUserId.getValue() !== authorId) {
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
