import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma';
import { PromptReportRepository } from '../../application';
import {
  PromptId,
  PromptReport,
  PromptReportId,
  PromptReportReason,
  PromptReportStatus,
  UserId,
} from '../../domain';

@Injectable()
export class PrismaPromptReportRepository implements PromptReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  async existsForPromptAndReporter(
    promptId: PromptId,
    reporterId: UserId,
  ): Promise<boolean> {
    const count = await this.prisma.promptReport.count({
      where: {
        promptId: promptId.getValue(),
        reporterId: reporterId.getValue(),
      },
    });
    return count > 0;
  }

  async getById(id: PromptReportId): Promise<PromptReport | null> {
    const reportData = await this.prisma.promptReport.findUnique({
      where: {
        id: id.getValue(),
      },
    });

    if (!reportData) {
      return null;
    }

    return this.mapToDomain(reportData);
  }

  async getByIdOrFail(id: PromptReportId): Promise<PromptReport> {
    const report = await this.getById(id);

    if (!report) {
      throw new NotFoundException(
        `Prompt report with ID ${id.getValue()} not found`,
      );
    }

    return report;
  }

  async save(report: PromptReport): Promise<void> {
    await this.prisma.promptReport.upsert({
      where: { id: report.getId().getValue() },
      update: {
        status: report.getStatus().getValue(),
      },
      create: {
        id: report.getId().getValue(),
        promptId: report.getPromptId().getValue(),
        reporterId: report.getReporterId().getValue(),
        reason: report.getReason().getValue(),
        status: report.getStatus().getValue(),
        createdAt: report.getCreatedAt(),
      },
    });
  }

  private mapToDomain(reportData: any): PromptReport {
    return new PromptReport(
      PromptReportId.create(reportData.id),
      PromptId.create(reportData.promptId),
      UserId.create(reportData.reporterId),
      PromptReportReason.create(reportData.reason),
      this.mapToStatusValueObject(reportData.status),
      reportData.createdAt,
    );
  }

  private mapToStatusValueObject(status: string): PromptReportStatus {
    switch (status) {
      case 'PENDING':
        return PromptReportStatus.pending();
      case 'ACCEPTED':
        return PromptReportStatus.accepted();
      case 'REJECTED':
        return PromptReportStatus.rejected();
      default:
        throw new Error(`Unknown prompt report status: ${status}`);
    }
  }
}
