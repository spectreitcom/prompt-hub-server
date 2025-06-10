import { PromptValidationException } from '../exceptions';

export class TagValue {
  private constructor(private readonly value: string) {}

  static create(raw: string): TagValue {
    const trimmed = raw.trim();

    if (trimmed.length < 1 || trimmed.length > 50) {
      throw new PromptValidationException(
        'Tag value must be between 1 and 50 characters.',
      );
    }

    // Ensure the tag value is lowercase and contains only alphanumeric characters and hyphens
    const sanitized = trimmed.toLowerCase().replace(/[^a-z0-9-]/g, '');

    if (sanitized.length === 0) {
      throw new PromptValidationException(
        'Tag value must contain at least one alphanumeric character.',
      );
    }

    return new TagValue(sanitized);
  }

  static getUniqueTags(tags: TagValue[]): TagValue[] {
    const uniqueTags: TagValue[] = [];
    for (const tag of tags) {
      if (!uniqueTags.some((existingTag) => existingTag.equals(tag))) {
        uniqueTags.push(tag);
      }
    }
    return uniqueTags;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: TagValue): boolean {
    return this.value === other.getValue();
  }
}
