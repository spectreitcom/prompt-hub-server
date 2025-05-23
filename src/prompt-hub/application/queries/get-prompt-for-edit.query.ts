export class GetPromptForEditQuery {
  constructor(
    public readonly promptId: string,
    public readonly userId: string,
  ) {}
}
