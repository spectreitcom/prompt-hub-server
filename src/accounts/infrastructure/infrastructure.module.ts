import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { UserRepository } from '../application';
import { PrismaUserRepository } from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class InfrastructureModule {}
