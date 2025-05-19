import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../queries';
import { UserRepository } from '../ports';
import { User, UserId } from '../../domain';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const userId = UserId.create(query.userId);
    return this.userRepository.findById(userId);
  }
}
