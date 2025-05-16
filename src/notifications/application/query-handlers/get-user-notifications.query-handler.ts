import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserNotificationsQuery } from '../queries';
import { NotificationView } from '../../views';
import { UserNotificationReadRepository } from '../ports';

@QueryHandler(GetUserNotificationsQuery)
export class GetUserNotificationsQueryHandler
  implements IQueryHandler<GetUserNotificationsQuery>
{
  constructor(
    private readonly userNotificationReadRepository: UserNotificationReadRepository,
  ) {}

  async execute(query: GetUserNotificationsQuery): Promise<NotificationView[]> {
    const { userId, take, skip } = query;
    return this.userNotificationReadRepository.findForUser(userId, take, skip);
  }
}
