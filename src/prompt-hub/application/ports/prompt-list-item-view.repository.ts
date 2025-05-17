import { PromptListItemView } from '../../views';

export abstract class PromptListItemViewRepository {
  abstract save(promptListItemView: PromptListItemView): Promise<void>;
  abstract getList(
    take: number,
    skip: number,
    search?: string,
  ): Promise<PromptListItemView[]>;
}
