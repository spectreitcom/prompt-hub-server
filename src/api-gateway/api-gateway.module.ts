import { Module } from '@nestjs/common';
import { PromptHubModule } from '../prompt-hub';
import { PromptReportModule } from '../prompt-report';
import { VotingModule } from '../voting';
import { SearchModule } from '../search';

@Module({
  imports: [PromptHubModule, PromptReportModule, VotingModule, SearchModule],
})
export class ApiGatewayModule {}
