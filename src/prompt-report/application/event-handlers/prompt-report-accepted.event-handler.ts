import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PromptReportAcceptedEvent } from '../../domain/events';
import { Logger } from '@nestjs/common';

@EventsHandler(PromptReportAcceptedEvent)
export class PromptReportAcceptedEventHandler
  implements IEventHandler<PromptReportAcceptedEvent>
{
  private readonly logger = new Logger(PromptReportAcceptedEventHandler.name);

  handle(event: PromptReportAcceptedEvent) {
    this.logger.debug(
      `Prompt report ${event.reportId.getValue()} was accepted for prompt ${event.promptId.getValue()}`,
    );
  }
}
