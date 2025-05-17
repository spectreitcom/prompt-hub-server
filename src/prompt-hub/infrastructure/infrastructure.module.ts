import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PromptCatalogItemRepository,
  PromptCatalogRepository,
  PromptListItemViewRepository,
  PromptRepository,
  PromptUserPublicRepository,
} from '../application';
import {
  PrismaPromptCatalogItemRepository,
  PrismaPromptCatalogRepository,
  PrismaPromptListItemViewRepository,
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
    {
      provide: PromptListItemViewRepository,
      useClass: PrismaPromptListItemViewRepository,
    },
  ],
  exports: [
    PromptRepository,
    PromptCatalogRepository,
    PromptCatalogItemRepository,
    PromptUserPublicRepository,
    PromptListItemViewRepository,
  ],
})
export class InfrastructureModule {}
