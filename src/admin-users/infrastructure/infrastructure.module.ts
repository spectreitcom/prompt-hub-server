import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { PrismaAdminUserRepository, PrismaAdminUserReadRepository } from './persistence';
import { AdminUserRepository, AdminUserReadRepository } from '../application/ports';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: AdminUserRepository,
      useClass: PrismaAdminUserRepository,
    },
    {
      provide: AdminUserReadRepository,
      useClass: PrismaAdminUserReadRepository,
    },
  ],
  exports: [AdminUserRepository, AdminUserReadRepository],
})
export class InfrastructureModule {}
