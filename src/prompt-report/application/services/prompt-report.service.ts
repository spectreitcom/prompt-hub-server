import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePromptReportCommand } from '../commands';
import { UserReportedPromptQuery } from '../queries';
import { PromptId, PromptReportReason, UserId } from '../../domain';

@Injectable()
export class PromptReportService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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
    const command = new CreatePromptReportCommand(
      PromptId.create(promptId),
      UserId.create(reporterId),
      PromptReportReason.create(reason),
    );
    return this.commandBus.execute(command);
  }

  /**
   * Checks if a user has already reported a prompt.
   *
   * @param {string} promptId - The unique identifier of the prompt.
   * @param {string} reporterId - The unique identifier of the user.
   * @return {Promise<boolean>} A promise that resolves to true if the user has already reported the prompt, false otherwise.
   */
  async hasUserReportedPrompt(
    promptId: string,
    reporterId: string,
  ): Promise<boolean> {
    const query = new UserReportedPromptQuery(
      PromptId.create(promptId),
      UserId.create(reporterId),
    );
    return this.queryBus.execute(query);
  }
}
