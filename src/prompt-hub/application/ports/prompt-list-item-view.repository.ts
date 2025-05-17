import { PromptListItemView } from '../../views';

export abstract class PromptListItemViewRepository {
  abstract save(promptListItemView: PromptListItemView): Promise<void>;
}
