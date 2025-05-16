import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { UserRepository, UserReadRepository } from '../application';
import { PrismaUserRepository, PrismaUserReadRepository } from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: UserReadRepository,
      useClass: PrismaUserReadRepository,
    },
  ],
  exports: [UserRepository, UserReadRepository],
})
export class InfrastructureModule {}
