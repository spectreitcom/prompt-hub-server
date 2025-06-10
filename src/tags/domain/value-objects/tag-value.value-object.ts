import {
  TagValueContentException,
  TagValueLengthException,
} from '../exceptions';

export class TagValue {
  private constructor(private readonly value: string) {}

  static create(raw: string): TagValue {
    const trimmed = raw.trim();

    if (trimmed.length < 1 || trimmed.length > 50) {
      throw new TagValueLengthException();
    }

    // Ensure the tag value is lowercase and contains only alphanumeric characters and hyphens
    const sanitized = trimmed.toLowerCase().replace(/[^a-z0-9-]/g, '');

    if (sanitized.length === 0) {
      throw new TagValueContentException();
    }

    return new TagValue(sanitized);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: TagValue): boolean {
    return this.value === other.getValue();
  }
}
