import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PrismaTagRepository,
  PrismaTagEntryViewRepository,
} from './persistence';
import { TagRepository, TagEntryViewRepository } from '../application';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: TagRepository,
      useClass: PrismaTagRepository,
    },
    {
      provide: TagEntryViewRepository,
      useClass: PrismaTagEntryViewRepository,
    },
  ],
  exports: [TagRepository, TagEntryViewRepository],
})
export class InfrastructureModule {}
