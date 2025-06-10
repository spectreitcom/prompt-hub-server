export class EmailAddressInvalidException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailAddressInvalidException';
  }
}
