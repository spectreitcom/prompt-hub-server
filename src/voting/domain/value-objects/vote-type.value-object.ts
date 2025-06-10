import { VoteTypeValue } from '../types';
import { VoteTypeInvalidException } from '../exceptions';

export class VoteType {
  private constructor(private readonly value: VoteTypeValue) {}

  static up(): VoteType {
    return new VoteType('UP');
  }

  static down(): VoteType {
    return new VoteType('DOWN');
  }

  static create(value: string): VoteType {
    const upper = value.toUpperCase();
    if (upper !== 'UP' && upper !== 'DOWN') {
      throw new VoteTypeInvalidException();
    }
    return new VoteType(upper as VoteTypeValue);
  }

  isUp(): boolean {
    return this.value === 'UP';
  }

  isDown(): boolean {
    return this.value === 'DOWN';
  }

  getValue(): VoteTypeValue {
    return this.value;
  }

  equals(other: VoteType): boolean {
    return this.value === other.getValue();
  }
}
