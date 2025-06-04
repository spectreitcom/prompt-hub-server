import {
  AdminUserId,
  EmailAddress,
  IsActive,
  IsSuperuser,
} from '../value-objects';

export class AdminUserCreatedEvent {
  constructor(
    public readonly id: AdminUserId,
    public readonly email: EmailAddress,
    public readonly isSuperuser: IsSuperuser,
    public readonly isActive: IsActive,
    public readonly createdAt: Date,
  ) {}
}
