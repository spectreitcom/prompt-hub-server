import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPublicAdminUserViewQuery } from '../queries';
import { AdminUserReadRepository } from '../ports';
import { AdminUserView } from '../../views';
import { AdminUserId } from '../../domain/value-objects';

@QueryHandler(GetPublicAdminUserViewQuery)
export class GetPublicAdminUserViewQueryHandler
  implements IQueryHandler<GetPublicAdminUserViewQuery>
{
  constructor(
    private readonly adminUserReadRepository: AdminUserReadRepository,
  ) {}

  async execute(query: GetPublicAdminUserViewQuery): Promise<AdminUserView> {
    const adminUserId = AdminUserId.create(query.adminUserId);
    return this.adminUserReadRepository.findById(adminUserId);
  }
}
