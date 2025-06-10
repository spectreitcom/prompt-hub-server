import { PromptReportException } from './prompt-report.exception';

export class UnknownPromptReportStatusException extends PromptReportException {
  constructor(status: string) {
    super(`Unknown prompt report status: ${status}`);
  }
}
