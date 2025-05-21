import { SearchPromptEntryView } from '../../views';

export abstract class SearchPromptEntryViewRepository {
  abstract save(searchPromptEntryView: SearchPromptEntryView): Promise<void>;
  abstract findById(id: string): Promise<SearchPromptEntryView>;
  abstract getList(
    skip: number,
    take: number,
    search?: string,
  ): Promise<SearchPromptEntryView[]>;
  abstract count(search?: string): Promise<number>;
  abstract delete(id: string): Promise<void>;
  abstract findByAuthor(
    authorId: string,
    skip: number,
    take: number,
    excludedPromptIds?: string[],
  ): Promise<SearchPromptEntryView[]>;
}
