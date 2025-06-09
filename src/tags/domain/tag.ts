import { AggregateRoot } from '@nestjs/cqrs';
import * as crypto from 'crypto';
import {
  TagActivatedEvent,
  TagCreatedEvent,
  TagDeactivatedEvent,
  TagRemovedEvent,
} from './events';
import { TagId, TagValue } from './value-objects';

export class Tag extends AggregateRoot {
  constructor(
    private readonly id: TagId,
    private readonly value: TagValue,
    private isActive: boolean,
  ) {
    super();
  }

  static create(value: TagValue, isActive: boolean = true): Tag {
    const id = TagId.create(crypto.randomUUID());
    const tag = new Tag(id, value, isActive);

    tag.apply(new TagCreatedEvent(id, value, isActive));

    return tag;
  }

  remove(): void {
    this.apply(new TagRemovedEvent(this.id, this.value));
  }

  activate(): void {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.apply(new TagActivatedEvent(this.id, this.value));
  }

  deactivate(): void {
    if (!this.isActive) {
      return;
    }

    this.isActive = false;
    this.apply(new TagDeactivatedEvent(this.id, this.value));
  }

  getId(): TagId {
    return this.id;
  }

  getValue(): TagValue {
    return this.value;
  }

  getIsActive(): boolean {
    return this.isActive;
  }
}
