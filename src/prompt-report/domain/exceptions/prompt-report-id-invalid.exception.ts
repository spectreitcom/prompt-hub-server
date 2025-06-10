import { PromptReportException } from './prompt-report.exception';

export class PromptReportIdInvalidException extends PromptReportException {
  constructor() {
    super('Prompt Report ID must be a valid UUID.');
  }
}
