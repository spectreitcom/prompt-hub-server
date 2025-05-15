import { Injectable } from '@nestjs/common';
import { PromptReportRepository } from '../../application';
import { PromptId, PromptReport, PromptReportId, UserId } from '../../domain';

@Injectable()
export class PrismaPromptReportRepository implements PromptReportRepository {
  existsForPromptAndReporter(
    promptId: PromptId,
    reporterId: UserId,
  ): Promise<boolean> {
    return Promise.resolve(false);
  }

  getById(id: PromptReportId): Promise<PromptReport | null> {
    return Promise.resolve(undefined);
  }

  getByIdOrFail(id: PromptReportId): Promise<PromptReport> {
    return Promise.resolve(undefined);
  }

  save(report: PromptReport): Promise<void> {
    return Promise.resolve(undefined);
  }
}
