import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  eventHandlers,
  commandHandlers,
  queryHandlers,
  FavoritesService,
} from './application';

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [
    ...eventHandlers,
    ...commandHandlers,
    ...queryHandlers,
    FavoritesService,
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
