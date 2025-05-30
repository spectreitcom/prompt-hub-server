export class NotificationPromptUserView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly avatarUrl?: string,
  ) {}
}
