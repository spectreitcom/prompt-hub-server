import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';
import { TagsService } from './application';

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
