import { PromptListItemView } from '../../views';

export abstract class PromptListItemViewRepository {
  abstract save(promptListItemView: PromptListItemView): Promise<void>;
  // should be sorted by most likes first
  abstract getList(
    take: number,
    skip: number,
    search?: string,
  ): Promise<PromptListItemView[]>;

  // should return only published prompts sorted by most likes first
  abstract getPublishedList(
    take: number,
    skip: number,
    search?: string,
  ): Promise<PromptListItemView[]>;

  abstract findById(id: string): Promise<PromptListItemView>;

  abstract delete(id: string): Promise<void>;

  abstract getUsersList(
    userId: string,
    take: number,
    skip: number,
    search?: string,
  ): Promise<PromptListItemView[]>;

  abstract getUsersPublishedPromptsList(
    userId: string,
    take: number,
    skip: number,
    search?: string,
  ): Promise<PromptListItemView[]>;
}
