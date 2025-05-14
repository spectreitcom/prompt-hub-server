import { isUUID } from 'class-validator';

export class PromptCatalogItemId {
  private constructor(private readonly value: string) {}

  static create(id: string): PromptCatalogItemId {
    if (!id || id.trim() === '') {
      throw new Error('Prompt Catalog Item ID cannot be empty.');
    }

    if (!isUUID(id, '4')) {
      throw new Error('Prompt Catalog Item ID must be a valid UUID.');
    }

    return new PromptCatalogItemId(id.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PromptCatalogItemId): boolean {
    return this.value === other.getValue();
  }
}
