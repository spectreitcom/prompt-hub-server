export class VoteTypeInvalidException extends Error {
  constructor() {
    super('Invalid vote type. Vote type must be either "UP" or "DOWN".');
    this.name = 'VoteTypeInvalidException';
  }
}
