export class PromptVisibility {
  private constructor(private readonly _value: 'public' | 'private') {}

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
    return this._value === 'public';
  }

  get value(): 'public' | 'private' {
    return this._value;
  }

  equals(other: PromptVisibility): boolean {
    return this._value === other._value;
  }
}
