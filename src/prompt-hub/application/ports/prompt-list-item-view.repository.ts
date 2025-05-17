import { PromptListItemView } from '../../views';

export abstract class PromptListItemViewRepository {
  abstract save(promptListItemView: PromptListItemView): Promise<void>;
  // should be sorted by most likes first
  abstract getList(
    take: number,
    skip: number,
    search?: string,
  ): Promise<PromptListItemView[]>;

  abstract findById(id: string): Promise<PromptListItemView>;
}
