export class FavoritePromptEntryView {
  constructor(
    public readonly promptId: string,
    public readonly title: string,
    public readonly authorId: string,
    public readonly authorName: string,
    public readonly authorAvatarUrl: string,
    public readonly userId: string,
  ) {}
}
