import { UserId } from '../../domain';
import { NotificationView } from '../../views';

export abstract class UserNotificationReadRepository {
  abstract findForUser(
    id: UserId,
    take: number,
    skip: number,
  ): Promise<NotificationView[]>;

  abstract countUnreadForUser(id: UserId): Promise<number>;
}
