export class GetPromptVoteStatusQuery {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
  ) {}
}
