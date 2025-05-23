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
  PromptViewedEventHandler,
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
  PromptViewedCommandHandler,
  PromptHubService,
  UserCreatedEventHandler,
  GetPromptListQueryHandler,
  GetUserPromptsQueryHandler,
  GetPromptDetailsQueryHandler,
  GetUserPromptCatalogsQueryHandler,
  GetPromptsByCatalogQueryHandler,
  GetPromptCatalogByIdQueryHandler,
  GetPromptForEditQueryHandler,
  PromptVoteCreatedEventHandler,
  PromptVoteChangedEventHandler,
} from './application';
import { InfrastructureModule } from './infrastructure';

const EventHandlers = [
  PromptCopiedEventHandler,
  PromptPublishedEventHandler,
  PromptVisibilityChangedEventHandler,
  PromptDeletedEventHandler,
  PromptViewedEventHandler,
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
  PromptViewedCommandHandler,
];

const QueryHandlers = [
  GetPromptListQueryHandler,
  GetUserPromptsQueryHandler,
  GetPromptDetailsQueryHandler,
  GetUserPromptCatalogsQueryHandler,
  GetPromptsByCatalogQueryHandler,
  GetPromptCatalogByIdQueryHandler,
  GetPromptForEditQueryHandler,
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
