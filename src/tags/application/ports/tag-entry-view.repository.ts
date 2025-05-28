import { TagEntryView } from '../../views';

export abstract class TagEntryViewRepository {
  abstract save(tag: TagEntryView): Promise<void>;
  abstract incrementUsage(id: string): Promise<void>;
  abstract decrementUsage(id: string): Promise<void>;
  abstract deactivate(id: string): Promise<void>;
  abstract getPopularTags(
    skip: number,
    take: number,
    search?: string,
  ): Promise<TagEntryView[]>;
  abstract findById(id: string): Promise<TagEntryView>;
}
