// Domain entity for AdminUser
import { AggregateRoot } from '@nestjs/cqrs';

export class AdminUser extends AggregateRoot {
  private readonly id: string;
  private readonly email: string;
  private readonly passwordHash: string;
  private readonly isSuperuser: boolean;
  private readonly createdAt: Date;
  private readonly isActive: boolean;

  private constructor(
    id: string,
    email: string,
    passwordHash: string,
    isSuperuser: boolean,
    createdAt: Date,
    isActive: boolean,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.isSuperuser = isSuperuser;
    this.createdAt = createdAt;
    this.isActive = isActive;
  }

  static create(
    id: string,
    email: string,
    passwordHash: string,
    isSuperuser: boolean = false,
    isActive: boolean = true,
  ): AdminUser {
    const now = new Date();
    const adminUser = new AdminUser(
      id,
      email,
      passwordHash,
      isSuperuser,
      now,
      isActive,
    );

    return adminUser;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  isSuperUser(): boolean {
    return this.isSuperuser;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  isActiveUser(): boolean {
    return this.isActive;
  }
}
