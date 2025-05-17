import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import {
  PrismaFavoritePromptRepository,
  PrismaFavoritePromptReadRepository,
} from './persistence';
import {
  FavoritePromptRepository,
  FavoritePromptReadRepository,
} from '../application';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: FavoritePromptRepository,
      useClass: PrismaFavoritePromptRepository,
    },
    {
      provide: FavoritePromptReadRepository,
      useClass: PrismaFavoritePromptReadRepository,
    },
  ],
  exports: [FavoritePromptRepository, FavoritePromptReadRepository],
})
export class InfrastructureModule {}
