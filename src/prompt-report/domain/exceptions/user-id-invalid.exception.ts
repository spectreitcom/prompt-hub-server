import { PromptReportException } from './prompt-report.exception';

export class UserIdInvalidException extends PromptReportException {
  constructor() {
    super('User ID must be a valid UUID.');
  }
}
