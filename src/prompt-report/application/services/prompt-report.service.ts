import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePromptReportCommand } from '../commands';

@Injectable()
export class PromptReportService {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * Creates a report for a specific prompt based on the provided reason.
   *
   * @param {string} promptId - The unique identifier of the prompt being reported.
   * @param {string} reporterId - The unique identifier of the user reporting the prompt.
   * @param {string} reason - The reason provided for reporting the prompt.
   * @return {Promise<void>} A promise that resolves when the report is successfully created.
   */
  async createPromptReport(
    promptId: string,
    reporterId: string,
    reason: string,
  ): Promise<void> {
    const command = new CreatePromptReportCommand(promptId, reporterId, reason);
    return this.commandBus.execute(command);
  }
}
