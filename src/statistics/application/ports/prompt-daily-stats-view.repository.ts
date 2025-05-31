import { PromptDailyStatsView } from '../../views';

export abstract class PromptDailyStatsViewRepository {
  abstract save(promptDailyStatsView: PromptDailyStatsView): Promise<void>;
  abstract findById(id: string): Promise<PromptDailyStatsView>;
  abstract incrementViewCount(id: string): Promise<void>;
  abstract incrementLikedCount(id: string): Promise<void>;
  abstract incrementDislikedCount(id: string): Promise<void>;
  abstract incrementFavoritesCount(id: string): Promise<void>;
  abstract incrementCopiedCount(id: string): Promise<void>;
  abstract deleteByPromptId(promptId: string): Promise<void>;
  abstract findByDateRange(
    promptId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<PromptDailyStatsView[]>;
}
