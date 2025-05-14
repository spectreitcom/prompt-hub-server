import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { PromptRepository } from '../application';
import { PrismaPromptRepository } from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: PromptRepository,
      useClass: PrismaPromptRepository,
    },
  ],
  exports: [PromptRepository],
})
export class InfrastructureModule {}
