import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RejectPromptReportCommand } from '../commands';
import { PromptReportRepository } from '../ports';
import { PromptReportId } from '../../domain';

@CommandHandler(RejectPromptReportCommand)
export class RejectPromptReportCommandHandler
  implements ICommandHandler<RejectPromptReportCommand, void>
{
  constructor(
    private readonly promptReportRepository: PromptReportRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: RejectPromptReportCommand): Promise<void> {
    const { reportId } = command;

    // Find the prompt report
    const reportIdObj = PromptReportId.create(reportId);
    const report = await this.promptReportRepository.getByIdOrFail(reportIdObj);

    // Mark the report as an event publisher
    const reportWithEvents = this.eventPublisher.mergeObjectContext(report);

    // Reject the report
    reportWithEvents.reject();

    // Save the report
    await this.promptReportRepository.save(reportWithEvents);

    // Commit events after saving
    reportWithEvents.commit();
  }
}
