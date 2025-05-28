import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CommandHandlers,
  EventHandlers,
  QueryHandlers,
  TagsService,
} from './application';

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [
    TagsService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  exports: [TagsService],
})
export class TagsModule {}
