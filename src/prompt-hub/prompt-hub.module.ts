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
  PromptReportCreatedEventHandler,
  PromptReportAcceptedEventHandler,
  PromptReportRejectedEventHandler,
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
  AcceptPromptReportCommandHandler,
  RejectPromptReportCommandHandler,
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
  PromptReportCreatedEventHandler,
  PromptReportAcceptedEventHandler,
  PromptReportRejectedEventHandler,
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
  AcceptPromptReportCommandHandler,
  RejectPromptReportCommandHandler,
];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [...EventHandlers, ...CommandHandlers],
})
export class PromptHubModule {}
