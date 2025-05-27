export class TagEntryView {
  constructor(
    public readonly id: string,
    public readonly value: string,
    public readonly isActive: boolean,
    public readonly usageCount: number,
  ) {}
}
