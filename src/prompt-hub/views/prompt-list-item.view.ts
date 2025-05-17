export class PromptListItemView {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly contentPreview: string,
    public readonly likedCount: number,
    public readonly copiedCount: number,
    public readonly viewCount: number,
    public readonly authorId: string,
    public readonly authorName: string,
    public readonly createdAt: Date,
    public readonly authorAvatarUrl?: string,
  ) {}
}
