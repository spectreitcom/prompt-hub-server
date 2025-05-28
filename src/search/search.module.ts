import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import * as EventHandlers from './application/event-handlers';
import * as QueryHandlers from './application/query-handlers';
import { SearchService } from './application';

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [
    ...Object.values(EventHandlers),
    ...Object.values(QueryHandlers),
    SearchService,
  ],
  exports: [SearchService],
})
export class SearchModule {}
