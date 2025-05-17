import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  eventHandlers,
  commandHandlers,
  FavoritesService,
} from './application';

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...eventHandlers, ...commandHandlers, FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
