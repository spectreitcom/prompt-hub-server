import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  PromptReportCreatedEventHandler,
  PromptReportAcceptedEventHandler,
  PromptReportRejectedEventHandler,
  AcceptPromptReportCommandHandler,
  RejectPromptReportCommandHandler,
  CreatePromptReportCommandHandler,
  PromptReportService,
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

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [PromptReportService, ...EventHandlers, ...CommandHandlers],
  exports: [PromptReportService],
})
export class PromptReportModule {}
