import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { PrismaTagRepository } from './persistence';
import { TagRepository } from '../application';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: TagRepository,
      useClass: PrismaTagRepository,
    },
  ],
  exports: [TagRepository],
})
export class InfrastructureModule {}
