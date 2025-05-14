import { PromptCatalogItemId } from '../prompt-catalog-item-id.value-object';
import { randomUUID } from 'crypto';

describe('PromptCatalogItemId', () => {
  describe('create', () => {
    it('should create a valid PromptCatalogItemId with a valid UUID', () => {
      // Arrange
      const validUuid = randomUUID();

      // Act
      const promptCatalogItemId = PromptCatalogItemId.create(validUuid);

      // Assert
      expect(promptCatalogItemId).toBeDefined();
      expect(promptCatalogItemId.getValue()).toBe(validUuid);
    });

    it('should throw an error if the UUID has spaces', () => {
      // Arrange
      const validUuid = randomUUID();
      const paddedUuid = `  ${validUuid}  `;

      // Act & Assert
      expect(() => PromptCatalogItemId.create(paddedUuid)).toThrow(
        'Prompt Catalog Item ID must be a valid UUID.',
      );
    });

    it('should throw an error if the UUID is empty', () => {
      // Act & Assert
      expect(() => PromptCatalogItemId.create('')).toThrow(
        'Prompt Catalog Item ID cannot be empty.',
      );
      expect(() => PromptCatalogItemId.create('   ')).toThrow(
        'Prompt Catalog Item ID cannot be empty.',
      );
    });

    it('should throw an error if the UUID is invalid', () => {
      // Act & Assert
      expect(() => PromptCatalogItemId.create('invalid-uuid')).toThrow(
        'Prompt Catalog Item ID must be a valid UUID.',
      );
      expect(() =>
        PromptCatalogItemId.create('123e4567-e89b-12d3-a456-42661417400'),
      ).toThrow('Prompt Catalog Item ID must be a valid UUID.');
    });
  });

  describe('getValue', () => {
    it('should return the UUID value', () => {
      // Arrange
      const validUuid = randomUUID();
      const promptCatalogItemId = PromptCatalogItemId.create(validUuid);

      // Act
      const result = promptCatalogItemId.getValue();

      // Assert
      expect(result).toBe(validUuid);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same UUID', () => {
      // Arrange
      const validUuid = randomUUID();
      const promptCatalogItemId1 = PromptCatalogItemId.create(validUuid);
      const promptCatalogItemId2 = PromptCatalogItemId.create(validUuid);

      // Act
      const result = promptCatalogItemId1.equals(promptCatalogItemId2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different UUIDs', () => {
      // Arrange
      const promptCatalogItemId1 = PromptCatalogItemId.create(randomUUID());
      const promptCatalogItemId2 = PromptCatalogItemId.create(randomUUID());

      // Act
      const result = promptCatalogItemId1.equals(promptCatalogItemId2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
