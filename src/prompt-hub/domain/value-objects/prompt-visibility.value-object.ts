export class PromptVisibility {
  private constructor(private readonly value: 'public' | 'private') {}

  static public(): PromptVisibility {
    return new PromptVisibility('public');
  }

  static private(): PromptVisibility {
    return new PromptVisibility('private');
  }

  static fromBoolean(isPublic: boolean): PromptVisibility {
    return isPublic ? this.public() : this.private();
  }

  get isPublic(): boolean {
    return this.value === 'public';
  }

  getValue(): 'public' | 'private' {
    return this.value;
  }

  equals(other: PromptVisibility): boolean {
    return this.value === other.getValue();
  }
}
