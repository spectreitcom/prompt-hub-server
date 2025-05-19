import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  SearchPromptEntryRepository,
  UserSearchViewRepository,
  SearchPromptEntryViewRepository,
} from '../application';
import {
  PrismaSearchPromptEntryRepository,
  PrismaUserSearchViewRepository,
  PrismaSearchPromptEntryViewRepository,
} from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: SearchPromptEntryRepository,
      useClass: PrismaSearchPromptEntryRepository,
    },
    {
      provide: UserSearchViewRepository,
      useClass: PrismaUserSearchViewRepository,
    },
    {
      provide: SearchPromptEntryViewRepository,
      useClass: PrismaSearchPromptEntryViewRepository,
    },
  ],
  exports: [
    SearchPromptEntryRepository,
    UserSearchViewRepository,
    SearchPromptEntryViewRepository
  ],
})
export class InfrastructureModule {}
