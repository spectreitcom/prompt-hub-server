import { AggregateRoot } from '@nestjs/cqrs';
import {
  AdminUserId,
  EmailAddress,
  IsActive,
  IsSuperuser,
  PasswordHash,
} from './value-objects';
import { AdminUserCreatedEvent } from './events';

export class AdminUser extends AggregateRoot {
  private readonly id: AdminUserId;
  private readonly email: EmailAddress;
  private readonly passwordHash: PasswordHash;
  private readonly isSuperuser: IsSuperuser;
  private readonly createdAt: Date;
  private readonly isActive: IsActive;

  private constructor(
    id: AdminUserId,
    email: EmailAddress,
    passwordHash: PasswordHash,
    isSuperuser: IsSuperuser,
    createdAt: Date,
    isActive: IsActive,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.isSuperuser = isSuperuser;
    this.createdAt = createdAt;
    this.isActive = isActive;
  }

  static createFromData(
    id: AdminUserId,
    email: EmailAddress,
    passwordHash: PasswordHash,
    isSuperuser: IsSuperuser,
    createdAt: Date,
    isActive: IsActive,
  ) {
    return new AdminUser(
      id,
      email,
      passwordHash,
      isSuperuser,
      createdAt,
      isActive,
    );
  }

  static create(
    email: string,
    passwordHash: string,
    isSuperuser: IsSuperuser = IsSuperuser.notSuperuser(),
    isActive: IsActive = IsActive.active(),
  ): AdminUser {
    const now = new Date();
    const id = AdminUserId.create();
    const emailAddress = EmailAddress.create(email);
    const adminUser = new AdminUser(
      id,
      emailAddress,
      PasswordHash.create(passwordHash),
      isSuperuser,
      now,
      isActive,
    );

    adminUser.apply(
      new AdminUserCreatedEvent(id, emailAddress, isSuperuser, isActive, now),
    );

    return adminUser;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getPasswordHash() {
    return this.passwordHash;
  }

  isSuperUser() {
    return this.isSuperuser;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  isActiveUser() {
    return this.isActive;
  }
}
