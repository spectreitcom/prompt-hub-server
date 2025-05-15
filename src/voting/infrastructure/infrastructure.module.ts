import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { PromptVoteRepository } from '../application';
import { PrismaPromptVoteRepository } from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: PromptVoteRepository,
      useClass: PrismaPromptVoteRepository,
    },
  ],
  exports: [PromptVoteRepository],
})
export class InfrastructureModule {}
