export class UserName {
  private constructor(private readonly value: string) {}

  static create(userName: string): UserName {
    if (!userName || userName.trim() === '') {
      throw new Error('Username cannot be empty.');
    }

    const trimmedUserName = userName.trim();

    if (trimmedUserName.length < 3) {
      throw new Error('Username must be at least 3 characters long.');
    }

    if (trimmedUserName.length > 50) {
      throw new Error('Username cannot exceed 50 characters.');
    }

    // Allow alphanumeric characters, underscores, and hyphens
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUserName)) {
      throw new Error(
        'Username can only contain letters, numbers, underscores, and hyphens.',
      );
    }

    return new UserName(trimmedUserName);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UserName): boolean {
    return this.value === other.getValue();
  }
}
