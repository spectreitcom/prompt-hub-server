import { Module } from '@nestjs/common';
import { PromptHubModule } from '../prompt-hub';
import { PromptReportModule } from '../prompt-report';
import { VotingModule } from '../voting';

@Module({
  imports: [PromptHubModule, PromptReportModule, VotingModule],
})
export class ApiGatewayModule {}
