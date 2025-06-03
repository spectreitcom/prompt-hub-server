import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { PrismaAdminUserRepository } from './persistence';
import { AdminUserRepository } from '../application/ports';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: AdminUserRepository,
      useClass: PrismaAdminUserRepository,
    },
  ],
  exports: [AdminUserRepository],
})
export class InfrastructureModule {}
