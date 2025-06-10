import { CatalogItemValidationException } from '../exceptions';

export class CatalogItemTimestamp {
  private constructor(private readonly addedAt: Date) {}

  static create(addedAt: Date): CatalogItemTimestamp {
    if (!(addedAt instanceof Date) || isNaN(addedAt.getTime())) {
      throw new CatalogItemValidationException(
        'Added At must be a valid date.',
      );
    }

    return new CatalogItemTimestamp(addedAt);
  }

  static createNew(): CatalogItemTimestamp {
    const now = new Date();
    return new CatalogItemTimestamp(now);
  }

  getAddedAt(): Date {
    return new Date(this.addedAt.getTime());
  }

  equals(other: CatalogItemTimestamp): boolean {
    return this.addedAt.getTime() === other.getAddedAt().getTime();
  }
}
