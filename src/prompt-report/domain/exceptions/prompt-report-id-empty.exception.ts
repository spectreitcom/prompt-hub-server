import { PromptReportException } from './prompt-report.exception';

export class PromptReportIdEmptyException extends PromptReportException {
  constructor() {
    super('Prompt Report ID cannot be empty.');
  }
}
