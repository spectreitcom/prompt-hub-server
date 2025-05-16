import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { SearchPromptEntryRepository } from '../application';
import { PrismaSearchPromptEntryRepository } from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: SearchPromptEntryRepository,
      useClass: PrismaSearchPromptEntryRepository,
    },
  ],
  exports: [SearchPromptEntryRepository],
})
export class InfrastructureModule {}
