export class UnauthorizedPromptAccessException extends Error {
  constructor(
    message: string = 'You are not authorized to access this prompt',
  ) {
    super(message);
  }
}
