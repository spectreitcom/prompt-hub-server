export class FavoritePromptView {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authorId: string,
    public readonly createdAt: Date,
  ) {}
}
