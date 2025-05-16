import { GoogleId } from '../google-id.value-object';

describe('GoogleId', () => {
  describe('create', () => {
    it('should create a valid GoogleId with a valid id', () => {
      // Arrange
      const validId = '123456789012345678901';

      // Act
      const googleId = GoogleId.create(validId);

      // Assert
      expect(googleId).toBeDefined();
      expect(googleId.getValue()).toBe(validId);
    });

    it('should trim whitespace from the id', () => {
      // Arrange
      const idWithWhitespace = '  123456789012345678901  ';

      // Act
      const googleId = GoogleId.create(idWithWhitespace);

      // Assert
      expect(googleId.getValue()).toBe('123456789012345678901');
    });

    it('should throw an error for an empty id', () => {
      // Arrange
      const emptyId = '';

      // Act & Assert
      expect(() => GoogleId.create(emptyId)).toThrow();
    });

    it('should throw an error for an id with only whitespace', () => {
      // Arrange
      const whitespaceId = '   ';

      // Act & Assert
      expect(() => GoogleId.create(whitespaceId)).toThrow();
    });
  });

  describe('equals', () => {
    it('should return true for equal GoogleIds', () => {
      // Arrange
      const id = '123456789012345678901';
      const googleId1 = GoogleId.create(id);
      const googleId2 = GoogleId.create(id);

      // Act & Assert
      expect(googleId1.equals(googleId2)).toBe(true);
    });

    it('should return false for different GoogleIds', () => {
      // Arrange
      const googleId1 = GoogleId.create('123456789012345678901');
      const googleId2 = GoogleId.create('987654321098765432109');

      // Act & Assert
      expect(googleId1.equals(googleId2)).toBe(false);
    });

    it('should return true for equal GoogleIds with different whitespace', () => {
      // Arrange
      const googleId1 = GoogleId.create('123456789012345678901');
      const googleId2 = GoogleId.create('  123456789012345678901  ');

      // Act & Assert
      expect(googleId1.equals(googleId2)).toBe(true);
    });
  });
});
