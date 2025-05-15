import { Module } from '@nestjs/common';
import { PromptHubModule } from '../prompt-hub';
import { PromptReportModule } from '../prompt-report';
import { PromptVoteModule } from '../prompt-vote';

@Module({
  imports: [PromptHubModule, PromptReportModule, PromptVoteModule],
})
export class ApiGatewayModule {}
