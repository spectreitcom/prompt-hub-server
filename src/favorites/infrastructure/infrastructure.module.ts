import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { PrismaFavoritePromptRepository } from './repositories';
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
