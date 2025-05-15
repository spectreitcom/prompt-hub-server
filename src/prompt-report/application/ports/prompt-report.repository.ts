import { PromptId, PromptReport, PromptReportId, UserId } from '../../domain';

export abstract class PromptReportRepository {
  abstract save(report: PromptReport): Promise<void>;
  abstract getById(id: PromptReportId): Promise<PromptReport | null>;
  abstract getByIdOrFail(id: PromptReportId): Promise<PromptReport>;
  abstract existsForPromptAndReporter(
    promptId: PromptId,
    reporterId: UserId,
  ): Promise<boolean>;
}
