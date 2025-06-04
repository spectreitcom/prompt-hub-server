import { PasswordHash } from '../password-hash.value-object';
import * as bcrypt from 'bcryptjs';

// Mock bcryptjs to avoid actual hashing in tests
jest.mock('bcryptjs', () => ({
  genSaltSync: jest.fn().mockReturnValue('mockedSalt'),
  hashSync: jest
    .fn()
    .mockImplementation((password, salt) => `hashed_${password}`),
  compareSync: jest
    .fn()
    .mockImplementation((password, hash) => hash === `hashed_${password}`),
}));

describe('PasswordHash', () => {
  describe('create', () => {
    it('should create a valid PasswordHash with a valid password', () => {
      // Arrange
      const validPassword = 'password123';

      // Act
      const passwordHash = PasswordHash.create(validPassword);

      // Assert
      expect(passwordHash).toBeDefined();
      expect(bcrypt.hashSync).toHaveBeenCalledWith(validPassword, 'mockedSalt');
      expect(passwordHash.getValue()).toBe(`hashed_${validPassword}`);
    });

    it('should throw an error for an empty password', () => {
      // Arrange
      const emptyPassword = '';

      // Mock hashSync to return empty string for empty password
      (bcrypt.hashSync as jest.Mock).mockReturnValueOnce('');

      // Act & Assert
      expect(() => PasswordHash.create(emptyPassword)).toThrow(
        'Password hash cannot be empty.',
      );
    });
  });

  describe('createFromHash', () => {
    it('should create a valid PasswordHash with a valid hash', () => {
      // Arrange
      const validHash = 'hashed_password_123';

      // Act
      const passwordHash = PasswordHash.createFromHash(validHash);

      // Assert
      expect(passwordHash).toBeDefined();
      expect(passwordHash.getValue()).toBe(validHash);
    });

    it('should throw an error for an empty hash', () => {
      // Arrange
      const emptyHash = '';

      // Act & Assert
      expect(() => PasswordHash.createFromHash(emptyHash)).toThrow(
        'Password hash cannot be empty.',
      );
    });

    it('should throw an error for a hash with only whitespace', () => {
      // Arrange
      const whitespaceHash = '   ';

      // Act & Assert
      expect(() => PasswordHash.createFromHash(whitespaceHash)).toThrow(
        'Password hash cannot be empty.',
      );
    });
  });

  describe('equals', () => {
    it('should return true for equal PasswordHash objects', () => {
      // Arrange
      const hash = 'hashed_password_123';
      const passwordHash1 = PasswordHash.createFromHash(hash);
      const passwordHash2 = PasswordHash.createFromHash(hash);

      // Act & Assert
      expect(passwordHash1.equals(passwordHash2)).toBe(true);
    });

    it('should return false for different PasswordHash objects', () => {
      // Arrange
      const passwordHash1 = PasswordHash.createFromHash('hashed_password_123');
      const passwordHash2 = PasswordHash.createFromHash(
        'different_hashed_password',
      );

      // Act & Assert
      expect(passwordHash1.equals(passwordHash2)).toBe(false);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching password', () => {
      // Arrange
      const password = 'password123';
      const passwordHash = PasswordHash.create(password);

      // Act & Assert
      expect(passwordHash.comparePassword(password)).toBe(true);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        password,
        `hashed_${password}`,
      );
    });

    it('should return false for non-matching password', () => {
      // Arrange
      const password = 'password123';
      const wrongPassword = 'wrongPassword';
      const passwordHash = PasswordHash.create(password);

      // Act & Assert
      expect(passwordHash.comparePassword(wrongPassword)).toBe(false);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        wrongPassword,
        `hashed_${password}`,
      );
    });
  });
});
