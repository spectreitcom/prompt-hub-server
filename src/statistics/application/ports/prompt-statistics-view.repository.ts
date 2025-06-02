import { PromptStatisticsView } from '../../views';

export abstract class PromptStatisticsViewRepository {
  abstract save(promptStatisticsView: PromptStatisticsView): Promise<void>;
  abstract incrementViewCount(promptId: string): Promise<void>;
  abstract incrementFavoritesCount(promptId: string): Promise<void>;
  abstract incrementLikedCount(promptId: string): Promise<void>;
  abstract incrementDislikedCount(promptId: string): Promise<void>;
  abstract incrementCopiedCount(promptId: string): Promise<void>;
  abstract delete(promptId: string): Promise<void>;
  abstract findByPromptId(promptId: string): Promise<PromptStatisticsView>;
}
