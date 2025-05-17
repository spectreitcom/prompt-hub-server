import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PromptCatalogItemRepository,
  PromptCatalogRepository,
  PromptRepository,
  PromptUserPublicRepository,
} from '../application';
import {
  PrismaPromptCatalogItemRepository,
  PrismaPromptCatalogRepository,
  PrismaPromptRepository,
  PrismaPromptUserPublicRepository,
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
    {
      provide: PromptUserPublicRepository,
      useClass: PrismaPromptUserPublicRepository,
    },
  ],
  exports: [
    PromptRepository,
    PromptCatalogRepository,
    PromptCatalogItemRepository,
    PromptUserPublicRepository,
  ],
})
export class InfrastructureModule {}
