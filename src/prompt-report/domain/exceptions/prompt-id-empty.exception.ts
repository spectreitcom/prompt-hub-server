import { PromptReportException } from './prompt-report.exception';

export class PromptIdEmptyException extends PromptReportException {
  constructor() {
    super('Prompt ID cannot be empty.');
  }
}
