import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  SearchPromptEntryRepository,
  UserSearchViewRepository,
} from '../application';
import {
  PrismaSearchPromptEntryRepository,
  PrismaUserSearchViewRepository,
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
  ],
  exports: [SearchPromptEntryRepository, UserSearchViewRepository],
})
export class InfrastructureModule {}
