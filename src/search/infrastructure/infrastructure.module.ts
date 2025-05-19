import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  UserSearchViewRepository,
  SearchPromptEntryViewRepository,
} from '../application';
import {
  PrismaUserSearchViewRepository,
  PrismaSearchPromptEntryViewRepository,
} from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserSearchViewRepository,
      useClass: PrismaUserSearchViewRepository,
    },
    {
      provide: SearchPromptEntryViewRepository,
      useClass: PrismaSearchPromptEntryViewRepository,
    },
  ],
  exports: [UserSearchViewRepository, SearchPromptEntryViewRepository],
})
export class InfrastructureModule {}
