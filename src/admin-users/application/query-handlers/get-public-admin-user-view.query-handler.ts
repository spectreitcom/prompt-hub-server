import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPublicAdminUserViewQuery } from '../queries';
import { AdminUserReadRepository } from '../ports';
import { AdminUserView } from '../../views';

@QueryHandler(GetPublicAdminUserViewQuery)
export class GetPublicAdminUserViewQueryHandler
  implements IQueryHandler<GetPublicAdminUserViewQuery>
{
  constructor(
    private readonly adminUserReadRepository: AdminUserReadRepository,
  ) {}

  async execute(query: GetPublicAdminUserViewQuery): Promise<AdminUserView> {
    return this.adminUserReadRepository.findById(query.adminUserId);
  }
}
