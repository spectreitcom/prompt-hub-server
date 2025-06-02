export class PromptStatisticsView {
  constructor(
    public readonly promptId: string,
    public readonly copiedCount: number,
    public readonly likedCount: number,
    public readonly dislikedCount: number,
    public readonly viewCount: number,
    public readonly favoritesCount: number,
  ) {}
}
