import { TagEntryView } from '../../views';

export abstract class TagEntryViewRepository {
  abstract save(tag: TagEntryView): Promise<void>;
  abstract incrementUsage(tagValue: string): Promise<void>;
  abstract decrementUsage(tagValue: string): Promise<void>;
  abstract deactivate(id: string): Promise<void>;
  abstract getPopularTags(
    skip: number,
    take: number,
    search?: string,
  ): Promise<TagEntryView[]>;
  abstract findById(id: string): Promise<TagEntryView>;
  abstract findAll(
    skip: number,
    take: number,
    search?: string,
  ): Promise<TagEntryView[]>;
  abstract countAll(search?: string): Promise<number>;
  abstract delete(id: string): Promise<void>;
}
