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
  PromptCatalogItemViewRepository,
} from '../application';
import {
  PrismaPromptCatalogItemRepository,
  PrismaPromptCatalogRepository,
  PrismaPromptCatalogViewRepository,
  PrismaPromptDetailsViewRepository,
  PrismaPromptListItemViewRepository,
  PrismaPromptRepository,
  PrismaPromptUserPublicRepository,
  PrismaPromptCatalogItemViewRepository,
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
    {
      provide: PromptCatalogItemViewRepository,
      useClass: PrismaPromptCatalogItemViewRepository,
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
    PromptCatalogItemViewRepository,
  ],
})
export class InfrastructureModule {}
