export class UserFavoritePromptView {
  constructor(
    public readonly promptId: string,
    public readonly title: string,
    public readonly authorId: string,
    public readonly authorName: string,
    public readonly authorAvatarUrl: string,
  ) {}
}
