import { EmailAddress } from '../email-address.value-object';

describe('EmailAddress', () => {
  describe('create', () => {
    it('should create a valid EmailAddress with a valid email', () => {
      // Arrange
      const validEmail = 'test@example.com';

      // Act
      const emailAddress = EmailAddress.create(validEmail);

      // Assert
      expect(emailAddress).toBeDefined();
      expect(emailAddress.getValue()).toBe(validEmail);
    });

    it('should trim whitespace from the email', () => {
      // Arrange
      const emailWithWhitespace = '  test@example.com  ';

      // Act
      const emailAddress = EmailAddress.create(emailWithWhitespace);

      // Assert
      expect(emailAddress.getValue()).toBe('test@example.com');
    });

    it('should convert email to lowercase', () => {
      // Arrange
      const uppercaseEmail = 'TEST@EXAMPLE.COM';

      // Act
      const emailAddress = EmailAddress.create(uppercaseEmail);

      // Assert
      expect(emailAddress.getValue()).toBe('test@example.com');
    });

    it('should throw an error for an empty email', () => {
      // Arrange
      const emptyEmail = '';

      // Act & Assert
      expect(() => EmailAddress.create(emptyEmail)).toThrow();
    });

    it('should throw an error for an invalid email format', () => {
      // Arrange
      const invalidEmail = 'not-an-email';

      // Act & Assert
      expect(() => EmailAddress.create(invalidEmail)).toThrow();
    });

    it('should throw an error for an email without domain', () => {
      // Arrange
      const invalidEmail = 'test@';

      // Act & Assert
      expect(() => EmailAddress.create(invalidEmail)).toThrow();
    });

    it('should throw an error for an email without username', () => {
      // Arrange
      const invalidEmail = '@example.com';

      // Act & Assert
      expect(() => EmailAddress.create(invalidEmail)).toThrow();
    });
  });

  describe('equals', () => {
    it('should return true for equal EmailAddresses', () => {
      // Arrange
      const email = 'test@example.com';
      const emailAddress1 = EmailAddress.create(email);
      const emailAddress2 = EmailAddress.create(email);

      // Act & Assert
      expect(emailAddress1.equals(emailAddress2)).toBe(true);
    });

    it('should return true for equal EmailAddresses with different case', () => {
      // Arrange
      const emailAddress1 = EmailAddress.create('test@example.com');
      const emailAddress2 = EmailAddress.create('TEST@EXAMPLE.COM');

      // Act & Assert
      expect(emailAddress1.equals(emailAddress2)).toBe(true);
    });

    it('should return false for different EmailAddresses', () => {
      // Arrange
      const emailAddress1 = EmailAddress.create('test1@example.com');
      const emailAddress2 = EmailAddress.create('test2@example.com');

      // Act & Assert
      expect(emailAddress1.equals(emailAddress2)).toBe(false);
    });
  });
});
