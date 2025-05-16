import { UserId } from '../../domain';

export class GetUserNotificationsQuery {
  constructor(
    public readonly userId: UserId,
    public readonly take: number = 10,
    public readonly skip: number = 0,
  ) {}
}
