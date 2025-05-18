export class PromptVoteEntryView {
  constructor(
    public readonly userId: string,
    public readonly promptId: string,
    public readonly vote: number,
    public readonly votedAt: Date,
  ) {}
}
