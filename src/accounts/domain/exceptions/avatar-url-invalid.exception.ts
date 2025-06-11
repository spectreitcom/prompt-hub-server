export class AvatarUrlInvalidException extends Error {
  constructor() {
    super('Avatar URL must be a valid HTTP or HTTPS URL.');
    this.name = 'AvatarUrlInvalidException';
  }
}
