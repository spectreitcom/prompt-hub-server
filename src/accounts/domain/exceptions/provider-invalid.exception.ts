export class ProviderInvalidException extends Error {
  constructor() {
    super('Invalid provider. Currently only "google" is supported.');
    this.name = 'ProviderInvalidException';
  }
}
