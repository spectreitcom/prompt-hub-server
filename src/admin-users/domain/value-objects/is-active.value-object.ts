export class IsActive {
  private constructor(private readonly value: boolean) {}

  static create(isActive: boolean): IsActive {
    return new IsActive(isActive);
  }

  getValue(): boolean {
    return this.value;
  }

  equals(other: IsActive): boolean {
    return this.value === other.getValue();
  }

  static active() {
    return new IsActive(true);
  }
}
