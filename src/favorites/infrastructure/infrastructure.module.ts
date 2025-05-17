import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PrismaFavoritePromptRepository,
  PrismaFavoritePromptEntryRepository,
  PrismaFavoriteUserPublicRepository,
  PrismaFavoritePromptViewRepository,
} from './persistence';
import {
  FavoritePromptRepository,
  FavoritePromptEntryRepository,
  FavoriteUserPublicRepository,
  FavoritePromptViewRepository,
} from '../application';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: FavoritePromptRepository,
      useClass: PrismaFavoritePromptRepository,
    },
    {
      provide: FavoritePromptEntryRepository,
      useClass: PrismaFavoritePromptEntryRepository,
    },
    {
      provide: FavoriteUserPublicRepository,
      useClass: PrismaFavoriteUserPublicRepository,
    },
    {
      provide: FavoritePromptViewRepository,
      useClass: PrismaFavoritePromptViewRepository,
    },
  ],
  exports: [
    FavoritePromptRepository,
    FavoritePromptEntryRepository,
    FavoriteUserPublicRepository,
    FavoritePromptViewRepository,
  ],
})
export class InfrastructureModule {}
