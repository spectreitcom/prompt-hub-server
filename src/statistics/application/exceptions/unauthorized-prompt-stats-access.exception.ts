export class UnauthorizedPromptStatsAccessException extends Error {
  constructor(
    message: string = 'You are not authorized to access these prompt statistics',
  ) {
    super(message);
  }
}