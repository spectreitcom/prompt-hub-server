export class NotificationView {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly payload: Record<string, any>,
    public readonly isRead: boolean,
    public readonly createdAt: Date,
  ) {}
}
