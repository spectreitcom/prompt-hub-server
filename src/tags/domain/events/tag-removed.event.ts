import { TagId, TagValue } from '../value-objects';

export class TagRemovedEvent {
  constructor(
    public readonly id: TagId,
    public readonly value: TagValue,
  ) {}
}
