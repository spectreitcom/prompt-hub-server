import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure';

@Module({
  imports: [InfrastructureModule],
  providers: [],
  exports: [],
})
export class PromptVoteModule {}
