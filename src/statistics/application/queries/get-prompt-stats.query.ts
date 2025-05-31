export class GetPromptStatsQuery {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
  ) {}
}
