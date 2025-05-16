import { Provider } from '../provider.value-object';

describe('Provider', () => {
  describe('create', () => {
    it('should create a valid Provider with "google"', () => {
      // Arrange
      const validProvider = 'google';

      // Act
      const provider = Provider.create(validProvider);

      // Assert
      expect(provider).toBeDefined();
      expect(provider.getValue()).toBe(validProvider);
      expect(provider.isGoogle()).toBe(true);
    });

    it('should trim whitespace from the provider', () => {
      // Arrange
      const providerWithWhitespace = '  google  ';

      // Act
      const provider = Provider.create(providerWithWhitespace);

      // Assert
      expect(provider.getValue()).toBe('google');
    });

    it('should convert provider to lowercase', () => {
      // Arrange
      const uppercaseProvider = 'GOOGLE';

      // Act
      const provider = Provider.create(uppercaseProvider);

      // Assert
      expect(provider.getValue()).toBe('google');
    });

    it('should throw an error for an empty provider', () => {
      // Arrange
      const emptyProvider = '';

      // Act & Assert
      expect(() => Provider.create(emptyProvider)).toThrow();
    });

    it('should throw an error for a provider with only whitespace', () => {
      // Arrange
      const whitespaceProvider = '   ';

      // Act & Assert
      expect(() => Provider.create(whitespaceProvider)).toThrow();
    });

    it('should throw an error for an unsupported provider', () => {
      // Arrange
      const unsupportedProvider = 'facebook';

      // Act & Assert
      expect(() => Provider.create(unsupportedProvider)).toThrow();
    });
  });

  describe('google', () => {
    it('should create a Google provider', () => {
      // Act
      const provider = Provider.google();

      // Assert
      expect(provider).toBeDefined();
      expect(provider.getValue()).toBe('google');
      expect(provider.isGoogle()).toBe(true);
    });
  });

  describe('isGoogle', () => {
    it('should return true for a Google provider', () => {
      // Arrange
      const provider = Provider.create('google');

      // Act & Assert
      expect(provider.isGoogle()).toBe(true);
    });

    it('should return true for a Google provider with different case', () => {
      // Arrange
      const provider = Provider.create('GOOGLE');

      // Act & Assert
      expect(provider.isGoogle()).toBe(true);
    });
  });

  describe('equals', () => {
    it('should return true for equal Providers', () => {
      // Arrange
      const provider1 = Provider.create('google');
      const provider2 = Provider.create('google');

      // Act & Assert
      expect(provider1.equals(provider2)).toBe(true);
    });

    it('should return true for equal Providers with different case', () => {
      // Arrange
      const provider1 = Provider.create('google');
      const provider2 = Provider.create('GOOGLE');

      // Act & Assert
      expect(provider1.equals(provider2)).toBe(true);
    });

    it('should return true for equal Providers with different whitespace', () => {
      // Arrange
      const provider1 = Provider.create('google');
      const provider2 = Provider.create('  google  ');

      // Act & Assert
      expect(provider1.equals(provider2)).toBe(true);
    });
  });
});
