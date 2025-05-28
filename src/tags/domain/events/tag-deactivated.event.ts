import { TagId, TagValue } from '../value-objects';

export class TagDeactivatedEvent {
  constructor(
    public readonly id: TagId,
    public readonly value: TagValue,
  ) {}
}
