import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [],
  exports: [],
})
export class SearchModule {}
