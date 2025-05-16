import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPublicUserViewQuery } from '../queries';
import { UserReadRepository } from '../ports';
import { UserProfileView } from '../../views';
import { UserId } from '../../domain';

@QueryHandler(GetPublicUserViewQuery)
export class GetPublicUserViewQueryHandler
  implements IQueryHandler<GetPublicUserViewQuery>
{
  constructor(private readonly userReadRepository: UserReadRepository) {}

  async execute(query: GetPublicUserViewQuery): Promise<UserProfileView> {
    const userId = UserId.create(query.userId);
    return this.userReadRepository.findProfileById(userId);
  }
}
