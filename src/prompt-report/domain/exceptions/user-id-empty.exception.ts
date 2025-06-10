import { PromptReportException } from './prompt-report.exception';

export class UserIdEmptyException extends PromptReportException {
  constructor() {
    super('User ID cannot be empty.');
  }
}
