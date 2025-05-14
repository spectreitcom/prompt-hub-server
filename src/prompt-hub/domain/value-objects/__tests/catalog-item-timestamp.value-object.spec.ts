import { CatalogItemTimestamp } from '../catalog-item-timestamp.value-object';

describe('CatalogItemTimestamp', () => {
  describe('create', () => {
    it('should create a valid CatalogItemTimestamp with a valid date', () => {
      // Arrange
      const validDate = new Date();

      // Act
      const timestamp = CatalogItemTimestamp.create(validDate);

      // Assert
      expect(timestamp).toBeDefined();
      expect(timestamp.getAddedAt().getTime()).toBe(validDate.getTime());
    });

    it('should throw an error if the date is invalid', () => {
      // Arrange
      const invalidDate = new Date('invalid date');

      // Act & Assert
      expect(() => CatalogItemTimestamp.create(invalidDate)).toThrow(
        'Added At must be a valid date.',
      );
    });

    it('should throw an error if the input is not a Date object', () => {
      // Act & Assert
      expect(() =>
        // @ts-ignore - Testing invalid input
        CatalogItemTimestamp.create('not a date'),
      ).toThrow('Added At must be a valid date.');
    });
  });

  describe('createNew', () => {
    it('should create a timestamp with the current date', () => {
      // Arrange
      const beforeCreation = new Date();

      // Act
      const timestamp = CatalogItemTimestamp.createNew();
      const afterCreation = new Date();

      // Assert
      const addedAt = timestamp.getAddedAt();
      expect(addedAt.getTime()).toBeGreaterThanOrEqual(
        beforeCreation.getTime(),
      );
      expect(addedAt.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
    });
  });

  describe('getAddedAt', () => {
    it('should return a copy of the date', () => {
      // Arrange
      const originalDate = new Date();
      const timestamp = CatalogItemTimestamp.create(originalDate);

      // Act
      const returnedDate = timestamp.getAddedAt();

      // Assert
      expect(returnedDate).not.toBe(originalDate); // Should be a different object
      expect(returnedDate.getTime()).toBe(originalDate.getTime()); // But with the same time

      // Modify the returned date
      const originalTime = returnedDate.getTime();
      returnedDate.setFullYear(returnedDate.getFullYear() + 1);

      // The internal date should not be affected
      expect(timestamp.getAddedAt().getTime()).toBe(originalTime);
    });
  });

  describe('equals', () => {
    it('should return true when comparing timestamps with the same date', () => {
      // Arrange
      const date = new Date();
      const timestamp1 = CatalogItemTimestamp.create(date);
      const timestamp2 = CatalogItemTimestamp.create(new Date(date.getTime()));

      // Act
      const result = timestamp1.equals(timestamp2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing timestamps with different dates', () => {
      // Arrange
      const date1 = new Date();
      const date2 = new Date(date1.getTime() + 1000); // 1 second later
      const timestamp1 = CatalogItemTimestamp.create(date1);
      const timestamp2 = CatalogItemTimestamp.create(date2);

      // Act
      const result = timestamp1.equals(timestamp2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
