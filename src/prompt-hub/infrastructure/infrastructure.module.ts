import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PromptCatalogItemRepository,
  PromptCatalogRepository,
  PromptCatalogViewRepository,
  PromptDetailsViewRepository,
  PromptListItemViewRepository,
  PromptRepository,
  PromptUserPublicRepository,
} from '../application';
import {
  PrismaPromptCatalogItemRepository,
  PrismaPromptCatalogRepository,
  PrismaPromptCatalogViewRepository,
  PrismaPromptDetailsViewRepository,
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
    {
      provide: PromptDetailsViewRepository,
      useClass: PrismaPromptDetailsViewRepository,
    },
    {
      provide: PromptCatalogViewRepository,
      useClass: PrismaPromptCatalogViewRepository,
    },
  ],
  exports: [
    PromptRepository,
    PromptCatalogRepository,
    PromptCatalogItemRepository,
    PromptUserPublicRepository,
    PromptListItemViewRepository,
    PromptDetailsViewRepository,
    PromptCatalogViewRepository,
  ],
})
export class InfrastructureModule {}
