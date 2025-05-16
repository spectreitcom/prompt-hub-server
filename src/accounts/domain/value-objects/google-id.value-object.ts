export class GoogleId {
  private constructor(private readonly value: string) {}

  static create(googleId: string): GoogleId {
    if (!googleId || googleId.trim() === '') {
      throw new Error('GoogleId cannot be empty.');
    }

    return new GoogleId(googleId.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: GoogleId): boolean {
    return this.value === other.getValue();
  }
}
