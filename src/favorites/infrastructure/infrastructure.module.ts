import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PrismaFavoritePromptRepository,
  PrismaFavoritePromptEntryRepository,
} from './persistence';
import {
  FavoritePromptRepository,
  FavoritePromptEntryRepository,
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
  ],
  exports: [FavoritePromptRepository, FavoritePromptEntryRepository],
})
export class InfrastructureModule {}
