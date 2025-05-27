import { TagId, TagValue } from '../value-objects';

export class TagActivatedEvent {
  constructor(
    public readonly id: TagId,
    public readonly value: TagValue,
  ) {}
}
