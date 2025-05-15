import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CatalogCreatedEventHandler,
  CatalogDeletedEventHandler,
  CatalogItemAddedEventHandler,
  CatalogItemRemovedEventHandler,
  CatalogRenamedEventHandler,
  PromptCopiedEventHandler,
  PromptDeletedEventHandler,
  PromptPublishedEventHandler,
  PromptVisibilityChangedEventHandler,
  CreatePromptCommandHandler,
  UpdatePromptCommandHandler,
  PublishPromptCommandHandler,
  SetPromptVisibilityCommandHandler,
  CopyPromptCommandHandler,
  DeletePromptCommandHandler,
  CreatePromptCatalogCommandHandler,
  RenamePromptCatalogCommandHandler,
  DeletePromptCatalogCommandHandler,
} from './application';
import { InfrastructureModule } from './infrastructure';

const EventHandlers = [
  PromptCopiedEventHandler,
  PromptPublishedEventHandler,
  PromptVisibilityChangedEventHandler,
  PromptDeletedEventHandler,
  CatalogCreatedEventHandler,
  CatalogRenamedEventHandler,
  CatalogDeletedEventHandler,
  CatalogItemAddedEventHandler,
  CatalogItemRemovedEventHandler,
];

const CommandHandlers = [
  CreatePromptCommandHandler,
  UpdatePromptCommandHandler,
  PublishPromptCommandHandler,
  SetPromptVisibilityCommandHandler,
  CopyPromptCommandHandler,
  DeletePromptCommandHandler,
  CreatePromptCatalogCommandHandler,
  RenamePromptCatalogCommandHandler,
  DeletePromptCatalogCommandHandler,
];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [...EventHandlers, ...CommandHandlers],
})
export class PromptHubModule {}
