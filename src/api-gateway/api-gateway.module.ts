import { Module } from '@nestjs/common';
import { PromptHubModule } from '../prompt-hub';

@Module({
  imports: [PromptHubModule],
})
export class ApiGatewayModule {}
