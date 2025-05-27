export class GetOtherAuthorPromptsQuery {
  constructor(
    public readonly authorId: string,
    public readonly take: number,
    public readonly skip: number,
    public readonly excludedPromptIds?: string[],
    public readonly search?: string,
  ) {}
}
