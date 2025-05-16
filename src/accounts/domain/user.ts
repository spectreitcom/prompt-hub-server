// Domain entity for User
import { AggregateRoot } from '@nestjs/cqrs';
import {
  UserId,
  EmailAddress,
  PersonName,
  AvatarUrl,
  Provider,
  GoogleId,
} from './value-objects';

export class User extends AggregateRoot {
  private readonly id: UserId;
  private readonly email: EmailAddress;
  private readonly name: PersonName;
  private readonly avatarUrl?: AvatarUrl;
  private readonly googleId: GoogleId;
  private readonly provider: Provider;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(
    id: UserId,
    email: EmailAddress,
    name: PersonName,
    avatarUrl: AvatarUrl | undefined,
    googleId: GoogleId,
    provider: Provider,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.googleId = googleId;
    this.provider = provider;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id.getValue();
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getName(): string {
    return this.name.getValue();
  }

  getAvatarUrl(): string | undefined {
    return this.avatarUrl?.getValue();
  }

  getGoogleId(): string {
    return this.googleId.getValue();
  }

  getProvider(): string {
    return this.provider.getValue();
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
