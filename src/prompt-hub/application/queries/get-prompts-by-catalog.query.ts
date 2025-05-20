export class GetPromptsByCatalogQuery {
  constructor(
    public readonly catalogId: string,
    public readonly skip: number,
    public readonly take: number,
    public readonly userId: string,
    public readonly search?: string,
  ) {}
}
