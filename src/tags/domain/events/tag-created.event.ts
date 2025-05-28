import { TagId, TagValue } from '../value-objects';

export class TagCreatedEvent {
  constructor(
    public readonly id: TagId,
    public readonly value: TagValue,
    public readonly isActive: boolean,
  ) {}
}
