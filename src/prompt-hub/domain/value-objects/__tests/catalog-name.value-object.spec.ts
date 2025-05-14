import { CatalogName } from '../catalog-name.value-object';

describe('CatalogName', () => {
  describe('create', () => {
    it('should create a valid CatalogName with a valid name', () => {
      // Arrange
      const validName = 'Test Catalog';

      // Act
      const catalogName = CatalogName.create(validName);

      // Assert
      expect(catalogName).toBeDefined();
      expect(catalogName.getValue()).toBe(validName);
    });

    it('should trim the name when storing', () => {
      // Arrange
      const validName = 'Test Catalog';
      const paddedName = `  ${validName}  `;

      // Act
      const catalogName = CatalogName.create(paddedName);

      // Assert
      expect(catalogName.getValue()).toBe(validName);
    });

    it('should throw an error if the name is too short', () => {
      // Act & Assert
      expect(() => CatalogName.create('ab')).toThrow(
        'Catalog name must be between 3 and 100 characters',
      );
      expect(() => CatalogName.create('  ab  ')).toThrow(
        'Catalog name must be between 3 and 100 characters',
      );
    });

    it('should throw an error if the name is too long', () => {
      // Arrange
      const tooLongName = 'a'.repeat(101);

      // Act & Assert
      expect(() => CatalogName.create(tooLongName)).toThrow(
        'Catalog name must be between 3 and 100 characters',
      );
    });
  });

  describe('getValue', () => {
    it('should return the name value', () => {
      // Arrange
      const validName = 'Test Catalog';
      const catalogName = CatalogName.create(validName);

      // Act
      const result = catalogName.getValue();

      // Assert
      expect(result).toBe(validName);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same name', () => {
      // Arrange
      const validName = 'Test Catalog';
      const catalogName1 = CatalogName.create(validName);
      const catalogName2 = CatalogName.create(validName);

      // Act
      const result = catalogName1.equals(catalogName2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different names', () => {
      // Arrange
      const catalogName1 = CatalogName.create('Test Catalog 1');
      const catalogName2 = CatalogName.create('Test Catalog 2');

      // Act
      const result = catalogName1.equals(catalogName2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
