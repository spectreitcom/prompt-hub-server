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
  AddPromptToCatalogCommandHandler,
  RemovePromptFromCatalogCommandHandler,
  PromptHubService,
  UserCreatedEventHandler,
  GetPromptListQueryHandler,
  GetUserPromptsQueryHandler,
  GetPromptDetailsQueryHandler,
  PromptVoteCreatedEventHandler,
  PromptVoteChangedEventHandler,
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
  UserCreatedEventHandler,
  PromptVoteCreatedEventHandler,
  PromptVoteChangedEventHandler,
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
  AddPromptToCatalogCommandHandler,
  RemovePromptFromCatalogCommandHandler,
];

const QueryHandlers = [
  GetPromptListQueryHandler,
  GetUserPromptsQueryHandler,
  GetPromptDetailsQueryHandler,
];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    PromptHubService,
  ],
  exports: [PromptHubService],
})
export class PromptHubModule {}
