import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  PromptCopiedEventHandler,
  PromptPublishedEventHandler,
} from './application';

const EventHandlers = [PromptCopiedEventHandler, PromptPublishedEventHandler];

@Module({
  imports: [CqrsModule],
  providers: [...EventHandlers],
})
export class PromptHubModule {}
