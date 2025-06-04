import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '../queries';
import { UserReadRepository } from '../ports';
import { UserProfileView } from '../../views';

export interface GetAllUsersResult {
  users: UserProfileView[];
  totalCount: number;
}

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler
  implements IQueryHandler<GetAllUsersQuery>
{
  constructor(private readonly userReadRepository: UserReadRepository) {}

  async execute(query: GetAllUsersQuery): Promise<GetAllUsersResult> {
    const [users, totalCount] = await Promise.all([
      this.userReadRepository.findAllProfiles(query.skip, query.take),
      this.userReadRepository.countAllProfiles(),
    ]);

    return {
      users,
      totalCount,
    };
  }
}
