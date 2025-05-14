import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CatalogCreatedEventHandler,
  CatalogRenamedEventHandler,
  PromptCopiedEventHandler,
  PromptPublishedEventHandler,
} from './application';

const EventHandlers = [
  PromptCopiedEventHandler,
  PromptPublishedEventHandler,
  CatalogCreatedEventHandler,
  CatalogRenamedEventHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...EventHandlers],
})
export class PromptHubModule {}
