import { AggregateRoot } from '@nestjs/cqrs';
import { TagId, TagValue } from './value-objects';

export class Tag extends AggregateRoot {
  constructor(
    private readonly id: TagId,
    private readonly value: TagValue,
    private readonly isActive: boolean,
  ) {
    super();
  }

  static create(id: TagId, value: TagValue, isActive: boolean): Tag {
    return new Tag(id, value, isActive);
  }

  getId(): string {
    return this.id.getValue();
  }

  getValue(): string {
    return this.value.getValue();
  }

  getIsActive(): boolean {
    return this.isActive;
  }
}
