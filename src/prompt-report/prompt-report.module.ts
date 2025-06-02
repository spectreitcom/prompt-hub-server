import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  PromptReportCreatedEventHandler,
  PromptReportAcceptedEventHandler,
  PromptReportRejectedEventHandler,
  AcceptPromptReportCommandHandler,
  RejectPromptReportCommandHandler,
  CreatePromptReportCommandHandler,
  UserReportedPromptQueryHandler,
  PromptReportService,
  AdminPromptReportService,
} from './application';
import { InfrastructureModule } from './infrastructure';

const EventHandlers = [
  PromptReportCreatedEventHandler,
  PromptReportAcceptedEventHandler,
  PromptReportRejectedEventHandler,
];

const CommandHandlers = [
  AcceptPromptReportCommandHandler,
  RejectPromptReportCommandHandler,
  CreatePromptReportCommandHandler,
];

const QueryHandlers = [UserReportedPromptQueryHandler];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [
    PromptReportService,
    AdminPromptReportService,
    ...EventHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [PromptReportService, AdminPromptReportService],
})
export class PromptReportModule {}
