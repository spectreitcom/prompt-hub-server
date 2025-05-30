export class GetPromptDetailsQuery {
  constructor(
    public readonly promptId: string,
    public readonly userId?: string,
  ) {}
}
