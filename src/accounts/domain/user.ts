// Domain entity for User
import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  private readonly id: string;
  private readonly email: string;
  private readonly name: string;
  private readonly avatarUrl?: string;
  private readonly provider: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    avatarUrl: string | undefined,
    provider: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.provider = provider;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getAvatarUrl(): string | undefined {
    return this.avatarUrl;
  }

  getProvider(): string {
    return this.provider;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}