export class VoteType {
  private constructor(private readonly value: 'UP' | 'DOWN') {}

  static up(): VoteType {
    return new VoteType('UP');
  }

  static down(): VoteType {
    return new VoteType('DOWN');
  }

  static create(value: string): VoteType {
    const upper = value.toUpperCase();
    if (upper !== 'UP' && upper !== 'DOWN') {
      throw new Error('Invalid vote type');
    }
    return new VoteType(upper as 'UP' | 'DOWN');
  }

  isUp(): boolean {
    return this.value === 'UP';
  }

  isDown(): boolean {
    return this.value === 'DOWN';
  }

  getValue(): 'UP' | 'DOWN' {
    return this.value;
  }

  equals(other: VoteType): boolean {
    return this.value === other.getValue();
  }
}
