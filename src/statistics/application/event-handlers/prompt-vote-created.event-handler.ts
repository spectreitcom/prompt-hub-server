import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptVoteCreatedEvent } from '../../../voting/domain';
import {
  PromptDailyStatsViewRepository,
  PromptStatisticsAuthorViewRepository,
  PromptStatisticsViewRepository,
} from '../ports';

@EventsHandler(PromptVoteCreatedEvent)
export class PromptVoteCreatedEventHandler
  implements IEventHandler<PromptVoteCreatedEvent>
{
  constructor(
    private readonly promptStatisticsViewRepository: PromptStatisticsViewRepository,
    private readonly promptDailyStatsViewRepository: PromptDailyStatsViewRepository,
    private readonly promptStatisticsAuthorViewRepository: PromptStatisticsAuthorViewRepository,
  ) {}

  async handle(event: PromptVoteCreatedEvent) {
    const { promptId, userId, voteType } = event;
    const promptIdValue = promptId.getValue();

    // Get author information for the prompt
    const promptStatisticsAuthorView =
      await this.promptStatisticsAuthorViewRepository.findByPromptId(
        promptIdValue,
      );

    // Only increment statistics if user is guest or not the author of the prompt
    if (
      !promptStatisticsAuthorView ||
      !userId ||
      userId.getValue() !== promptStatisticsAuthorView.authorId
    ) {
      // Update overall statistics based on vote type
      if (voteType.isUp()) {
        await this.promptStatisticsViewRepository.incrementLikedCount(
          promptIdValue,
        );
      } else if (voteType.isDown()) {
        await this.promptStatisticsViewRepository.incrementDislikedCount(
          promptIdValue,
        );
      }

      // Update daily statistics
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day

      // Format: promptId_YYYY-MM-DD
      const dateStr = today.toISOString().split('T')[0]; // Get YYYY-MM-DD part
      const dailyStatsId = `${promptIdValue}_${dateStr}`;

      // Update daily statistics based on vote type
      if (voteType.isUp()) {
        await this.promptDailyStatsViewRepository.incrementLikedCount(
          dailyStatsId,
        );
      } else if (voteType.isDown()) {
        await this.promptDailyStatsViewRepository.incrementDislikedCount(
          dailyStatsId,
        );
      }
    }
  }
}
