import {
  UserId,
  EmailAddress,
  PersonName,
  AvatarUrl,
  Provider,
  GoogleId,
} from '../value-objects';

export class UserCreatedEvent {
  constructor(
    public readonly userId: UserId,
    public readonly email: EmailAddress,
    public readonly name: PersonName,
    public readonly avatarUrl: AvatarUrl | undefined,
    public readonly googleId: GoogleId,
    public readonly provider: Provider,
    public readonly createdAt: Date,
  ) {}
}
