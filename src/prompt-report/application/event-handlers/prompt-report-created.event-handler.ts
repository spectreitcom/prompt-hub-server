import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptReportCreatedEvent } from '../../domain/events';
import { Logger } from '@nestjs/common';

@EventsHandler(PromptReportCreatedEvent)
export class PromptReportCreatedEventHandler
  implements IEventHandler<PromptReportCreatedEvent>
{
  private readonly logger = new Logger(PromptReportCreatedEventHandler.name);

  handle(event: PromptReportCreatedEvent) {
    this.logger.debug(
      `Prompt report created for prompt ${event.promptId.getValue()} by user ${event.reporterId.getValue()} with reason: ${event.reason.getValue()}`,
    );
  }
}
