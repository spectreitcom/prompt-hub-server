export class GetPublishedPromptListQuery {
  constructor(
    public readonly take: number,
    public readonly skip: number,
    public readonly search?: string,
    public readonly catalogId?: string,
    public readonly userId?: string,
  ) {}
}
