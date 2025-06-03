import { Injectable } from '@nestjs/common';
import {
  AcceptPromptReportCommand,
  RejectPromptReportCommand,
} from '../commands';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PromptReportId } from '../../domain';

@Injectable()
export class AdminPromptReportService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Handles the acceptance of a prompt report by initiating the appropriate command.
   *
   * @param {string} reportId - The unique identifier of the prompt report to be accepted.
   * @return {Promise<void>} A promise that resolves when the command to accept the report is executed.
   */
  async acceptPromptReport(reportId: string): Promise<void> {
    const command = new AcceptPromptReportCommand(
      PromptReportId.create(reportId),
    );
    return this.commandBus.execute(command);
  }

  /**
   * Rejects a prompt report based on the provided report ID.
   *
   * @param {string} reportId - The unique identifier of the prompt report to be rejected.
   * @return {Promise<void>} A promise that resolves when the rejection process is completed.
   */
  async rejectPromptReport(reportId: string): Promise<void> {
    const command = new RejectPromptReportCommand(
      PromptReportId.create(reportId),
    );
    return this.commandBus.execute(command);
  }
}
