import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { PromptCatalogRepository, PromptRepository } from '../application';
import {
  PrismaPromptCatalogRepository,
  PrismaPromptRepository,
} from './persistence';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: PromptRepository,
      useClass: PrismaPromptRepository,
    },
    {
      provide: PromptCatalogRepository,
      useClass: PrismaPromptCatalogRepository,
    },
  ],
  exports: [PromptRepository, PromptCatalogRepository],
})
export class InfrastructureModule {}
