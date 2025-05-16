export class Provider {
  private constructor(private readonly value: string) {}

  static create(provider: string): Provider {
    if (!provider || provider.trim() === '') {
      throw new Error('Provider cannot be empty.');
    }

    const trimmedProvider = provider.trim().toLowerCase();

    // Currently only 'google' is supported
    if (trimmedProvider !== 'google') {
      throw new Error(
        'Invalid provider. Currently only "google" is supported.',
      );
    }

    return new Provider(trimmedProvider);
  }

  static google() {
    return new Provider('google');
  }

  getValue(): string {
    return this.value;
  }

  isGoogle(): boolean {
    return this.value === 'google';
  }

  equals(other: Provider): boolean {
    return this.value === other.getValue();
  }
}
