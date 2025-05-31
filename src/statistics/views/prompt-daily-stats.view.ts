export class PromptDailyStatsView {
  constructor(
    public readonly promptId: string,
    public readonly date: Date,
    public readonly likedCount: number,
    public readonly dislikedCount: number,
    public readonly viewCount: number,
    public readonly favoritesCount: number,
  ) {}
}
