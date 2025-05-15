import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptReportRejectedEvent } from '../../domain/events';
import { Logger } from '@nestjs/common';

@EventsHandler(PromptReportRejectedEvent)
export class PromptReportRejectedEventHandler
  implements IEventHandler<PromptReportRejectedEvent>
{
  private readonly logger = new Logger(PromptReportRejectedEventHandler.name);

  handle(event: PromptReportRejectedEvent) {
    this.logger.debug(
      `Prompt report ${event.reportId.getValue()} was rejected`,
    );
  }
}
