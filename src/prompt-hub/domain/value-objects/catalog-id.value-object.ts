import { isUUID } from 'class-validator';
import { CatalogValidationException } from '../exceptions';

export class CatalogId {
  private constructor(private readonly value: string) {}

  static create(id: string): CatalogId {
    if (!id || id.trim() === '') {
      throw new CatalogValidationException('Catalog ID cannot be empty.');
    }

    if (!isUUID(id, '4')) {
      throw new CatalogValidationException('Catalog ID must be a valid UUID.');
    }

    return new CatalogId(id.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CatalogId): boolean {
    return this.value === other.getValue();
  }
}
