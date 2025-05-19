import { SearchPromptEntryView } from '../../views';

export abstract class SearchPromptEntryViewRepository {
  abstract save(searchPromptEntryView: SearchPromptEntryView): Promise<void>;
  abstract findById(id: string): Promise<SearchPromptEntryView>;
  abstract getList(
    skip: number,
    take: number,
    search?: string,
  ): Promise<SearchPromptEntryView[]>;
}
