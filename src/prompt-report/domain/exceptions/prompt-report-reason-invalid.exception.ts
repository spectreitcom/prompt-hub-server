import { PromptReportException } from './prompt-report.exception';

export class PromptReportReasonInvalidException extends PromptReportException {
  constructor() {
    super('Report reason must be between 5 and 500 characters');
  }
}
