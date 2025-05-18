export class GetUserPromptsQuery {
  constructor(
    public readonly userId: string,
    public readonly take: number,
    public readonly skip: number,
    public readonly search?: string,
  ) {}
}
