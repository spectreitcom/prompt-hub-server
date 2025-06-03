import { isUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class AdminUserId {
  private constructor(private readonly value: string) {}

  static create(id?: string): AdminUserId {
    // If id is undefined, use randomUUID()
    // If id is defined but empty or only whitespace, throw an error
    if (id !== undefined && (id === '' || id.trim() === '')) {
      throw new Error('Admin User ID cannot be empty.');
    }

    const adminUserId = id || randomUUID();

    const trimmedId = adminUserId.trim();

    if (!isUUID(trimmedId, '4')) {
      throw new Error('Admin User ID must be a valid UUID.');
    }

    return new AdminUserId(trimmedId);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: AdminUserId): boolean {
    return this.value === other.getValue();
  }
}
