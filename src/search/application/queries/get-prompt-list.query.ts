export class GetPromptListQuery {
  constructor(
    public readonly take: number,
    public readonly skip: number,
    public readonly search?: string,
  ) {}
}
