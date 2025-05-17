export class FavoriteUserPublicView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly avatarUrl?: string,
  ) {}
}
