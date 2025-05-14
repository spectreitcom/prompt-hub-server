import { CatalogId } from '../catalog-id.value-object';
import { randomUUID } from 'crypto';

describe('CatalogId', () => {
  describe('create', () => {
    it('should create a valid CatalogId with a valid UUID', () => {
      // Arrange
      const validUuid = randomUUID();

      // Act
      const catalogId = CatalogId.create(validUuid);

      // Assert
      expect(catalogId).toBeDefined();
      expect(catalogId.getValue()).toBe(validUuid);
    });

    it('should throw an error if the UUID has spaces', () => {
      // Arrange
      const validUuid = randomUUID();
      const paddedUuid = `  ${validUuid}  `;

      // Act & Assert
      expect(() => CatalogId.create(paddedUuid)).toThrow(
        'Catalog ID must be a valid UUID.',
      );
    });

    it('should throw an error if the UUID is empty', () => {
      // Act & Assert
      expect(() => CatalogId.create('')).toThrow('Catalog ID cannot be empty.');
      expect(() => CatalogId.create('   ')).toThrow(
        'Catalog ID cannot be empty.',
      );
    });

    it('should throw an error if the UUID is invalid', () => {
      // Act & Assert
      expect(() => CatalogId.create('invalid-uuid')).toThrow(
        'Catalog ID must be a valid UUID.',
      );
      expect(() =>
        CatalogId.create('123e4567-e89b-12d3-a456-42661417400'),
      ).toThrow('Catalog ID must be a valid UUID.');
    });
  });

  describe('getValue', () => {
    it('should return the UUID value', () => {
      // Arrange
      const validUuid = randomUUID();
      const catalogId = CatalogId.create(validUuid);

      // Act
      const result = catalogId.getValue();

      // Assert
      expect(result).toBe(validUuid);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same UUID', () => {
      // Arrange
      const validUuid = randomUUID();
      const catalogId1 = CatalogId.create(validUuid);
      const catalogId2 = CatalogId.create(validUuid);

      // Act
      const result = catalogId1.equals(catalogId2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different UUIDs', () => {
      // Arrange
      const catalogId1 = CatalogId.create(randomUUID());
      const catalogId2 = CatalogId.create(randomUUID());

      // Act
      const result = catalogId1.equals(catalogId2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
