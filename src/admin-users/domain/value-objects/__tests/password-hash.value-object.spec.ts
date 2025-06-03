import { PasswordHash } from '../password-hash.value-object';

describe('PasswordHash', () => {
  describe('create', () => {
    it('should create a valid PasswordHash with a valid hash', () => {
      // Arrange
      const validHash = 'hashed_password_123';

      // Act
      const passwordHash = PasswordHash.create(validHash);

      // Assert
      expect(passwordHash).toBeDefined();
      expect(passwordHash.getValue()).toBe(validHash);
    });

    it('should throw an error for an empty hash', () => {
      // Arrange
      const emptyHash = '';

      // Act & Assert
      expect(() => PasswordHash.create(emptyHash)).toThrow(
        'Password hash cannot be empty.',
      );
    });

    it('should throw an error for a hash with only whitespace', () => {
      // Arrange
      const whitespaceHash = '   ';

      // Act & Assert
      expect(() => PasswordHash.create(whitespaceHash)).toThrow(
        'Password hash cannot be empty.',
      );
    });
  });

  describe('equals', () => {
    it('should return true for equal PasswordHash objects', () => {
      // Arrange
      const hash = 'hashed_password_123';
      const passwordHash1 = PasswordHash.create(hash);
      const passwordHash2 = PasswordHash.create(hash);

      // Act & Assert
      expect(passwordHash1.equals(passwordHash2)).toBe(true);
    });

    it('should return false for different PasswordHash objects', () => {
      // Arrange
      const passwordHash1 = PasswordHash.create('hashed_password_123');
      const passwordHash2 = PasswordHash.create('different_hashed_password');

      // Act & Assert
      expect(passwordHash1.equals(passwordHash2)).toBe(false);
    });
  });
});
