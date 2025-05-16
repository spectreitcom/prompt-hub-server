export class SignUpWithGmailCommand {
  constructor(
    public readonly googleId: string,
    public readonly email: string,
    public readonly name: string,
    public readonly avatarUrl?: string,
  ) {}
}
