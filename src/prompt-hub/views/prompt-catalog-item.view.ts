export class PromptCatalogItemView {
  constructor(
    public readonly promptId: string,
    public readonly promptTitle: string,
    public readonly catalogId: string,
    public readonly catalogName: string,
    public readonly addedAt: Date,
  ) {}
}
