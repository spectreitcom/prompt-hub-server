import { AvatarUrl, EmailAddress, GoogleId, PersonName } from '../../domain';

export class SignUpWithGmailCommand {
  constructor(
    public readonly googleId: GoogleId,
    public readonly email: EmailAddress,
    public readonly name: PersonName,
    public readonly avatarUrl?: AvatarUrl,
  ) {}
}
