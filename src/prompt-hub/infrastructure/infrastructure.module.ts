import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PromptCatalogItemRepository,
  PromptCatalogRepository,
  PromptRepository,
} from '../application';
import {
  PrismaPromptCatalogItemRepository,
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
    {
      provide: PromptCatalogItemRepository,
      useClass: PrismaPromptCatalogItemRepository,
    },
  ],
  exports: [
    PromptRepository,
    PromptCatalogRepository,
    PromptCatalogItemRepository,
  ],
})
export class InfrastructureModule {}
