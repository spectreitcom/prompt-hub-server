import { UserId } from '../user-id.value-object';
import { randomUUID } from 'crypto';

describe('UserId', () => {
  describe('create', () => {
    it('should create a valid UserId with a valid UUID', () => {
      // Arrange
      const validUuid = randomUUID();

      // Act
      const userId = UserId.create(validUuid);

      // Assert
      expect(userId).toBeDefined();
      expect(userId.getValue()).toBe(validUuid);
    });

    it('should trim the UUID when storing', () => {
      // Arrange
      const validUuid = randomUUID();
      const paddedUuid = `  ${validUuid}  `;

      // Act
      const userId = UserId.create(validUuid);
      const trimmedUserId = UserId.create(paddedUuid.trim());

      // Assert
      expect(userId.getValue()).toBe(trimmedUserId.getValue());
    });

    it('should throw an error if the UUID is empty', () => {
      // Act & Assert
      expect(() => UserId.create('')).toThrow('User ID cannot be empty.');
      expect(() => UserId.create('   ')).toThrow('User ID cannot be empty.');
    });

    it('should throw an error if the UUID is invalid', () => {
      // Act & Assert
      expect(() => UserId.create('invalid-uuid')).toThrow(
        'User ID must be a valid UUID.',
      );
      expect(() =>
        UserId.create('123e4567-e89b-12d3-a456-42661417400'),
      ).toThrow('User ID must be a valid UUID.');
    });
  });

  describe('getValue', () => {
    it('should return the UUID value', () => {
      // Arrange
      const validUuid = randomUUID();
      const userId = UserId.create(validUuid);

      // Act
      const result = userId.getValue();

      // Assert
      expect(result).toBe(validUuid);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same UUID', () => {
      // Arrange
      const validUuid = randomUUID();
      const userId1 = UserId.create(validUuid);
      const userId2 = UserId.create(validUuid);

      // Act
      const result = userId1.equals(userId2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different UUIDs', () => {
      // Arrange
      const userId1 = UserId.create(randomUUID());
      const userId2 = UserId.create(randomUUID());

      // Act
      const result = userId1.equals(userId2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
