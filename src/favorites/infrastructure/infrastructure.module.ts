import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PrismaFavoritePromptRepository,
  PrismaFavoritePromptEntryRepository,
  PrismaFavoriteUserPublicRepository,
} from './persistence';
import {
  FavoritePromptRepository,
  FavoritePromptEntryRepository,
  FavoriteUserPublicRepository,
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
  ],
  exports: [FavoritePromptRepository, FavoritePromptEntryRepository, FavoriteUserPublicRepository],
})
export class InfrastructureModule {}
