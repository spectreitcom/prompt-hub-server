import { FavoritePrompt } from '../../domain';
import { FavoritePromptId, PromptId, UserId } from '../../domain';

export abstract class FavoritePromptRepository {
  abstract save(favoritePrompt: FavoritePrompt): Promise<void>;
  abstract getById(id: FavoritePromptId): Promise<FavoritePrompt | null>;
  abstract existsByPromptIdAndUserId(
    promptId: PromptId,
    userId: UserId,
  ): Promise<boolean>;
  abstract getByPromptIdAndUserId(
    promptId: PromptId,
    userId: UserId,
  ): Promise<FavoritePrompt | null>;
  abstract remove(id: FavoritePromptId): Promise<void>;
}
