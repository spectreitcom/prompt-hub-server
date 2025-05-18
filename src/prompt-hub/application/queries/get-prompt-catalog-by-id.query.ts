export class GetPromptCatalogByIdQuery {
  constructor(
    public readonly catalogId: string,
    public readonly userId: string,
  ) {}
}
