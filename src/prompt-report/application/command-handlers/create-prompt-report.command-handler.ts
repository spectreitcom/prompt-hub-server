import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePromptReportCommand } from '../commands';
import { PromptReportRepository } from '../ports';
import {
  PromptId,
  PromptReportReason,
  UserId,
  PromptReport,
} from '../../domain';

@CommandHandler(CreatePromptReportCommand)
export class CreatePromptReportCommandHandler
  implements ICommandHandler<CreatePromptReportCommand, void>
{
  constructor(
    private readonly promptReportRepository: PromptReportRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreatePromptReportCommand): Promise<void> {
    const { promptId, reporterId, reason } = command;

    // Create the prompt report
    const report = PromptReport.create(promptId, reporterId, reason);

    // Mark the report as an event publisher
    const reportWithEvents = this.eventPublisher.mergeObjectContext(report);

    // Save the report
    await this.promptReportRepository.save(reportWithEvents);

    // Commit events after saving
    reportWithEvents.commit();
  }
}
