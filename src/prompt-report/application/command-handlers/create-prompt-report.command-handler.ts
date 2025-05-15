import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePromptReportCommand } from '../commands';
import { PromptReportRepository } from '../ports';
import { PromptId, PromptReportReason, UserId } from '../../domain';
import { PromptReport } from '../../domain/prompt-report';

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

    // Create value objects
    const promptIdObj = PromptId.create(promptId);
    const reporterIdObj = UserId.create(reporterId);
    const reasonObj = PromptReportReason.create(reason);

    // Create the prompt report
    const report = PromptReport.create(promptIdObj, reporterIdObj, reasonObj);

    // Mark the report as an event publisher
    const reportWithEvents = this.eventPublisher.mergeObjectContext(report);

    // Save the report
    await this.promptReportRepository.save(reportWithEvents);

    // Commit events after saving
    reportWithEvents.commit();
  }
}
