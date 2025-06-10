export class EmailAddressEmptyException extends Error {
  constructor() {
    super('Email address cannot be empty.');
    this.name = 'EmailAddressEmptyException';
  }
}
