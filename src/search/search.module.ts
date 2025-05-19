import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import * as EventHandlers from './application/event-handlers';

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [...Object.values(EventHandlers)],
  exports: [],
})
export class SearchModule {}
