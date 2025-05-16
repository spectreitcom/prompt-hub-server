import { UserId } from '../../domain';

export class GetUnreadNotificationCountQuery {
  constructor(public readonly userId: UserId) {}
}
