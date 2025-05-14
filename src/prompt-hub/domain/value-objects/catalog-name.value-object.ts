export class CatalogName {
  private constructor(private readonly value: string) {}

  static create(value: string): CatalogName {
    const name = value.trim();
    if (name.length < 3 || name.length > 100) {
      throw new Error('Catalog name must be between 3 and 100 characters');
    }
    return new CatalogName(name);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CatalogName): boolean {
    return this.value === other.getValue();
  }
}
