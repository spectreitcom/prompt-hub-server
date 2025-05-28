import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers, TagsService } from './application';

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [TagsService, ...CommandHandlers],
  exports: [TagsService],
})
export class TagsModule {}
