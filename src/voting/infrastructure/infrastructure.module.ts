import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PromptVoteEntryViewRepository,
  PromptVoteRepository,
} from '../application';
import {
  PrismaPromptVoteEntryViewRepository,
  PrismaPromptVoteRepository,
} from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: PromptVoteRepository,
      useClass: PrismaPromptVoteRepository,
    },
    {
      provide: PromptVoteEntryViewRepository,
      useClass: PrismaPromptVoteEntryViewRepository,
    },
  ],
  exports: [PromptVoteRepository, PromptVoteEntryViewRepository],
})
export class InfrastructureModule {}
