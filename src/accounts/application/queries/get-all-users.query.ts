export class GetAllUsersQuery {
  constructor(
    public readonly skip: number = 0,
    public readonly take: number = 10,
  ) {}
}
