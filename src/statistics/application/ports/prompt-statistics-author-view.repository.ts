import { PromptStatisticsAuthorView } from '../../views';

export abstract class PromptStatisticsAuthorViewRepository {
  abstract save(
    promptStatisticsAuthorView: PromptStatisticsAuthorView,
  ): Promise<void>;
  abstract findByPromptId(
    promptId: string,
  ): Promise<PromptStatisticsAuthorView>;
  abstract delete(promptId: string): Promise<void>;
}
