import { PromptVoteEntryView } from '../../views';

export abstract class PromptVoteEntryViewRepository {
  abstract save(promptVoteEntryView: PromptVoteEntryView): Promise<void>;
  abstract findByPromptAndUser(
    promptId: string,
    userId: string,
  ): Promise<PromptVoteEntryView>;
  abstract exists(promptId: string, userId: string): Promise<boolean>;
}
