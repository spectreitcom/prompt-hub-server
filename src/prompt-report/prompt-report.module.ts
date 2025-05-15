import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  PromptReportCreatedEventHandler,
  PromptReportAcceptedEventHandler,
  PromptReportRejectedEventHandler,
  AcceptPromptReportCommandHandler,
  RejectPromptReportCommandHandler,
  CreatePromptReportCommandHandler,
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
  providers: [...EventHandlers, ...CommandHandlers],
})
export class PromptReportModule {}
