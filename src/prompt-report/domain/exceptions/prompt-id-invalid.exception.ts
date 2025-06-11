import { PromptReportException } from './prompt-report.exception';

export class PromptIdInvalidException extends PromptReportException {
  constructor() {
    super('Prompt ID must be a valid UUID.');
  }
}
