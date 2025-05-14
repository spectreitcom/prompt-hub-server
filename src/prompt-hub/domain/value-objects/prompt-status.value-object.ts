import { PromptStatus as PromptStatusType } from '@prisma/client';

export class PromptStatus {
  private constructor(private readonly value: PromptStatusType) {}

  static draft(): PromptStatus {
    return new PromptStatus(PromptStatusType.DRAFT);
  }

  static published(): PromptStatus {
    return new PromptStatus(PromptStatusType.PUBLISHED);
  }

  getValue(): PromptStatusType {
    return this.value;
  }

  isDraft(): boolean {
    return this.value === PromptStatusType.DRAFT;
  }

  isPublished(): boolean {
    return this.value === PromptStatusType.PUBLISHED;
  }

  equals(other: PromptStatus): boolean {
    return this.value === other.getValue();
  }
}
