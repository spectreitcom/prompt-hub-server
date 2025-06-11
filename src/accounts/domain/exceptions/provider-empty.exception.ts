export class ProviderEmptyException extends Error {
  constructor() {
    super('Provider cannot be empty.');
    this.name = 'ProviderEmptyException';
  }
}
