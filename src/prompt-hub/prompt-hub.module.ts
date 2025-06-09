import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CatalogCreatedEventHandler,
  CatalogDeletedEventHandler,
  CatalogItemAddedEventHandler,
  CatalogItemRemovedEventHandler,
  CatalogRenamedEventHandler,
  PromptCopiedEventHandler,
  PromptCreatedEventHandler,
  PromptDeletedEventHandler,
  PromptPublishedEventHandler,
  PromptTagsReplacedEventHandler,
  PromptUpdatedEventHandler,
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
  ReplacePromptTagsCommandHandler,
  PromptHubService,
  UserCreatedEventHandler,
  GetPromptListQueryHandler,
  GetPublishedPromptListQueryHandler,
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
import { TagRemovedEventHandler } from './application/event-handlers/tag-removed.event-handler';

const EventHandlers = [
  PromptCopiedEventHandler,
  PromptCreatedEventHandler,
  PromptUpdatedEventHandler,
  PromptPublishedEventHandler,
  PromptVisibilityChangedEventHandler,
  PromptDeletedEventHandler,
  PromptViewedEventHandler,
  PromptTagsReplacedEventHandler,
  CatalogCreatedEventHandler,
  CatalogRenamedEventHandler,
  CatalogDeletedEventHandler,
  CatalogItemAddedEventHandler,
  CatalogItemRemovedEventHandler,
  UserCreatedEventHandler,
  PromptVoteCreatedEventHandler,
  PromptVoteChangedEventHandler,
  TagRemovedEventHandler,
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
  ReplacePromptTagsCommandHandler,
];

const QueryHandlers = [
  GetPromptListQueryHandler,
  GetPublishedPromptListQueryHandler,
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
