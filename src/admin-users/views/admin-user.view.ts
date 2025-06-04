export class AdminUserView {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly isSuperuser: boolean,
    public readonly isActive: boolean,
  ) {}
}
