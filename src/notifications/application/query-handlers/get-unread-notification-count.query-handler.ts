import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUnreadNotificationCountQuery } from '../queries';
import { UserNotificationReadRepository } from '../ports';

@QueryHandler(GetUnreadNotificationCountQuery)
export class GetUnreadNotificationCountQueryHandler
  implements IQueryHandler<GetUnreadNotificationCountQuery>
{
  constructor(
    private readonly userNotificationReadRepository: UserNotificationReadRepository,
  ) {}

  async execute(query: GetUnreadNotificationCountQuery): Promise<number> {
    const { userId } = query;
    return this.userNotificationReadRepository.countUnreadForUser(userId);
  }
}
