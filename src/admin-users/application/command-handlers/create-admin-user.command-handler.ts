import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAdminUserCommand } from '../commands';
import { AdminUserRepository } from '../ports';
import { AdminUser } from '../../domain';

@CommandHandler(CreateAdminUserCommand)
export class CreateAdminUserCommandHandler
  implements ICommandHandler<CreateAdminUserCommand>
{
  constructor(private readonly adminUserRepository: AdminUserRepository) {}

  async execute(command: CreateAdminUserCommand): Promise<void> {
    const { email, password, isSuperuser, isActive } = command;
    const adminUser = AdminUser.create(email, password, isSuperuser, isActive);
    await this.adminUserRepository.save(adminUser);
  }
}
