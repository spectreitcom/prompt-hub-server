import { FavoritePromptId } from '../favorite-prompt-id.value-object';
import { randomUUID } from 'crypto';

describe('FavoritePromptId', () => {
  describe('create', () => {
    it('should create a valid FavoritePromptId with a valid UUID', () => {
      // Arrange
      const validUuid = randomUUID();

      // Act
      const favoritePromptId = FavoritePromptId.create(validUuid);

      // Assert
      expect(favoritePromptId).toBeDefined();
      expect(favoritePromptId.getValue()).toBe(validUuid);
    });

    it('should trim the UUID when storing', () => {
      // Arrange
      const validUuid = randomUUID();
      const paddedUuid = `  ${validUuid}  `;

      // Act
      const favoritePromptId = FavoritePromptId.create(paddedUuid);

      // Assert
      expect(favoritePromptId.getValue()).toBe(validUuid);
    });

    it('should throw an error if the UUID is empty', () => {
      // Act & Assert
      expect(() => FavoritePromptId.create('')).toThrow(
        'Favorite Prompt ID cannot be empty.',
      );
      expect(() => FavoritePromptId.create('   ')).toThrow(
        'Favorite Prompt ID cannot be empty.',
      );
    });

    it('should throw an error if the UUID is invalid', () => {
      // Act & Assert
      expect(() => FavoritePromptId.create('invalid-uuid')).toThrow(
        'Favorite Prompt ID must be a valid UUID.',
      );
      expect(() =>
        FavoritePromptId.create('123e4567-e89b-12d3-a456-42661417400'),
      ).toThrow('Favorite Prompt ID must be a valid UUID.');
    });
  });

  describe('getValue', () => {
    it('should return the UUID value', () => {
      // Arrange
      const validUuid = randomUUID();
      const favoritePromptId = FavoritePromptId.create(validUuid);

      // Act
      const result = favoritePromptId.getValue();

      // Assert
      expect(result).toBe(validUuid);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same UUID', () => {
      // Arrange
      const validUuid = randomUUID();
      const favoritePromptId1 = FavoritePromptId.create(validUuid);
      const favoritePromptId2 = FavoritePromptId.create(validUuid);

      // Act
      const result = favoritePromptId1.equals(favoritePromptId2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different UUIDs', () => {
      // Arrange
      const favoritePromptId1 = FavoritePromptId.create(randomUUID());
      const favoritePromptId2 = FavoritePromptId.create(randomUUID());

      // Act
      const result = favoritePromptId1.equals(favoritePromptId2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
