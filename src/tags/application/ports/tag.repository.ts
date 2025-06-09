import { Tag, TagId, TagValue } from '../../domain';

export abstract class TagRepository {
  abstract save(tag: Tag): Promise<void>;
  abstract findById(id: TagId): Promise<Tag>;
  abstract findByValue(value: TagValue): Promise<Tag>;
  abstract existsByValue(value: TagValue): Promise<boolean>;
  abstract remove(id: TagId): Promise<void>;
}
