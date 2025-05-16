import { UserId } from '../user-id.value-object';

describe('UserId', () => {
  describe('create', () => {
    it('should create a valid UserId with a valid UUID', () => {
      // Arrange
      const validUuid = '123e4567-e89b-42d3-a456-426614174000';

      // Act
      const userId = UserId.create(validUuid);

      // Assert
      expect(userId).toBeDefined();
      expect(userId.getValue()).toBe(validUuid);
    });

    it('should trim whitespace from the UUID', () => {
      // Arrange
      const uuidWithWhitespace = '  123e4567-e89b-42d3-a456-426614174000  ';

      // Act
      const userId = UserId.create(uuidWithWhitespace);

      // Assert
      expect(userId.getValue()).toBe('123e4567-e89b-42d3-a456-426614174000');
    });

    it('should throw an error for an empty UUID', () => {
      // Arrange
      const emptyUuid = '';

      // Act & Assert
      expect(() => UserId.create(emptyUuid)).toThrow();
    });

    it('should throw an error for a UUID with only whitespace', () => {
      // Arrange
      const whitespaceUuid = '   ';

      // Act & Assert
      expect(() => UserId.create(whitespaceUuid)).toThrow();
    });

    it('should throw an error for an invalid UUID format', () => {
      // Arrange
      const invalidUuid = 'not-a-uuid';

      // Act & Assert
      expect(() => UserId.create(invalidUuid)).toThrow();
    });

    it('should throw an error for a UUID with incorrect version', () => {
      // Arrange - this is a version 1 UUID
      const invalidVersionUuid = '123e4567-e89b-11d3-a456-426614174000';

      // Act & Assert
      expect(() => UserId.create(invalidVersionUuid)).toThrow();
    });
  });

  describe('equals', () => {
    it('should return true for equal UserIds', () => {
      // Arrange
      const uuid = '123e4567-e89b-42d3-a456-426614174000';
      const userId1 = UserId.create(uuid);
      const userId2 = UserId.create(uuid);

      // Act & Assert
      expect(userId1.equals(userId2)).toBe(true);
    });

    it('should return false for different UserIds', () => {
      // Arrange
      const userId1 = UserId.create('123e4567-e89b-42d3-a456-426614174000');
      const userId2 = UserId.create('123e4567-e89b-42d3-a456-426614174001');

      // Act & Assert
      expect(userId1.equals(userId2)).toBe(false);
    });

    it('should return true for equal UserIds with different whitespace', () => {
      // Arrange
      const userId1 = UserId.create('123e4567-e89b-42d3-a456-426614174000');
      const userId2 = UserId.create('  123e4567-e89b-42d3-a456-426614174000  ');

      // Act & Assert
      expect(userId1.equals(userId2)).toBe(true);
    });
  });
});
