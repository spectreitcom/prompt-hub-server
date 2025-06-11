export class EmailAddressInvalidException extends Error {
  constructor() {
    super('Invalid email address format.');
    this.name = 'EmailAddressInvalidException';
  }
}
