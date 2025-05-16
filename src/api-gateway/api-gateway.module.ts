import { Module } from '@nestjs/common';
import { PromptHubModule } from '../prompt-hub';
import { PromptReportModule } from '../prompt-report';
import { VotingModule } from '../voting';
import { SearchModule } from '../search';
import { NotificationsModule } from '../notifications';

@Module({
  imports: [
    PromptHubModule,
    PromptReportModule,
    VotingModule,
    SearchModule,
    NotificationsModule,
  ],
})
export class ApiGatewayModule {}
