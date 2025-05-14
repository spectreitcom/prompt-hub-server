export class PromptContent {
  private constructor(private readonly value: string) {}

  static create(raw: string): PromptContent {
    const normalized = raw.trim();

    if (normalized.length === 0) {
      throw new Error('Prompt content cannot be empty.');
    }

    if (normalized.length > 5000) {
      throw new Error('Prompt content is too long.');
    }

    return new PromptContent(normalized);
  }

  getValue(): string {
    return this.value;
  }

  getPreview(): string {
    return this.value.slice(0, 160) + (this.value.length > 160 ? '...' : '');
  }

  equals(other: PromptContent): boolean {
    return this.value === other.getValue();
  }
}
