import { CatalogValidationException } from '../exceptions';

export class CatalogTimestamps {
  private constructor(
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  static create(createdAt: Date, updatedAt: Date): CatalogTimestamps {
    if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
      throw new CatalogValidationException('Created at must be a valid date.');
    }

    if (!(updatedAt instanceof Date) || isNaN(updatedAt.getTime())) {
      throw new CatalogValidationException('Updated at must be a valid date.');
    }

    if (updatedAt < createdAt) {
      throw new CatalogValidationException(
        'Updated at cannot be earlier than created at.',
      );
    }

    return new CatalogTimestamps(createdAt, updatedAt);
  }

  static createNew(): CatalogTimestamps {
    const now = new Date();
    return new CatalogTimestamps(now, now);
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }

  withUpdatedAt(updatedAt: Date): CatalogTimestamps {
    if (!(updatedAt instanceof Date) || isNaN(updatedAt.getTime())) {
      throw new CatalogValidationException('Updated at must be a valid date.');
    }

    if (updatedAt < this.createdAt) {
      throw new CatalogValidationException(
        'Updated at cannot be earlier than created at.',
      );
    }

    return new CatalogTimestamps(this.createdAt, updatedAt);
  }

  equals(other: CatalogTimestamps): boolean {
    return (
      this.createdAt.getTime() === other.getCreatedAt().getTime() &&
      this.updatedAt.getTime() === other.getUpdatedAt().getTime()
    );
  }
}
