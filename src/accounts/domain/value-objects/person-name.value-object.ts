export class PersonName {
  private constructor(private readonly value: string) {}

  static create(name: string): PersonName {
    if (!name || name.trim() === '') {
      throw new Error('Person name cannot be empty.');
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      throw new Error('Person name must be at least 2 characters long.');
    }

    if (trimmedName.length > 100) {
      throw new Error('Person name cannot exceed 100 characters.');
    }

    // Allow letters, spaces, hyphens, and apostrophes (common in names)
    if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      throw new Error(
        'Person name can only contain letters, spaces, hyphens, and apostrophes.',
      );
    }

    return new PersonName(trimmedName);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PersonName): boolean {
    return this.value === other.getValue();
  }
}
