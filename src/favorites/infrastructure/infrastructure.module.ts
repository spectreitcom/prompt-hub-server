import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { PrismaFavoritePromptRepository } from './persistence';
import { FavoritePromptRepository } from '../application';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: FavoritePromptRepository,
      useClass: PrismaFavoritePromptRepository,
    },
  ],
  exports: [FavoritePromptRepository],
})
export class InfrastructureModule {}
