import { PromptReportException } from './prompt-report.exception';

export class ReportNotPendingException extends PromptReportException {
  constructor(action: string) {
    super(`Only pending reports can be ${action}`);
  }
}
