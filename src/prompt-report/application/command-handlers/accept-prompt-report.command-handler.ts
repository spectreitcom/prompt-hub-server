import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AcceptPromptReportCommand } from '../commands';
import { PromptReportRepository } from '../ports';

@CommandHandler(AcceptPromptReportCommand)
export class AcceptPromptReportCommandHandler
  implements ICommandHandler<AcceptPromptReportCommand, void>
{
  constructor(
    private readonly promptReportRepository: PromptReportRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: AcceptPromptReportCommand): Promise<void> {
    const { reportId } = command;

    // Find the prompt report
    const report = await this.promptReportRepository.getByIdOrFail(reportId);

    // Mark the report as an event publisher
    const reportWithEvents = this.eventPublisher.mergeObjectContext(report);

    // Accept the report
    reportWithEvents.accept();

    // Save the report
    await this.promptReportRepository.save(reportWithEvents);

    // Commit events after saving
    reportWithEvents.commit();
  }
}
