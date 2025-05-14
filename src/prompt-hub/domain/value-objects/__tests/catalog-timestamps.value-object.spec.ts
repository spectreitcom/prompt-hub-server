import { CatalogTimestamps } from '../catalog-timestamps.value-object';

describe('CatalogTimestamps', () => {
  describe('create', () => {
    it('should create a valid CatalogTimestamps with valid dates', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');

      // Act
      const timestamps = CatalogTimestamps.create(createdAt, updatedAt);

      // Assert
      expect(timestamps).toBeDefined();
      expect(timestamps.getCreatedAt().toISOString()).toBe(
        createdAt.toISOString(),
      );
      expect(timestamps.getUpdatedAt().toISOString()).toBe(
        updatedAt.toISOString(),
      );
    });

    it('should throw an error if createdAt is not a valid date', () => {
      // Arrange
      const invalidDate = new Date('invalid-date');
      const validDate = new Date();

      // Act & Assert
      expect(() => CatalogTimestamps.create(invalidDate, validDate)).toThrow(
        'Created at must be a valid date.',
      );
    });

    it('should throw an error if updatedAt is not a valid date', () => {
      // Arrange
      const validDate = new Date();
      const invalidDate = new Date('invalid-date');

      // Act & Assert
      expect(() => CatalogTimestamps.create(validDate, invalidDate)).toThrow(
        'Updated at must be a valid date.',
      );
    });

    it('should throw an error if updatedAt is earlier than createdAt', () => {
      // Arrange
      const createdAt = new Date('2023-01-02T00:00:00Z');
      const updatedAt = new Date('2023-01-01T00:00:00Z');

      // Act & Assert
      expect(() => CatalogTimestamps.create(createdAt, updatedAt)).toThrow(
        'Updated at cannot be earlier than created at.',
      );
    });
  });

  describe('createNew', () => {
    it('should create a new CatalogTimestamps with current date for both createdAt and updatedAt', () => {
      // Arrange
      const before = new Date();

      // Act
      const timestamps = CatalogTimestamps.createNew();

      // Assert
      const after = new Date();
      expect(timestamps.getCreatedAt().getTime()).toBeGreaterThanOrEqual(
        before.getTime(),
      );
      expect(timestamps.getCreatedAt().getTime()).toBeLessThanOrEqual(
        after.getTime(),
      );
      expect(timestamps.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(
        before.getTime(),
      );
      expect(timestamps.getUpdatedAt().getTime()).toBeLessThanOrEqual(
        after.getTime(),
      );
      expect(timestamps.getCreatedAt().getTime()).toBe(
        timestamps.getUpdatedAt().getTime(),
      );
    });
  });

  describe('getCreatedAt', () => {
    it('should return a copy of the createdAt date', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');
      const timestamps = CatalogTimestamps.create(createdAt, updatedAt);

      // Act
      const result = timestamps.getCreatedAt();

      // Assert
      expect(result.toISOString()).toBe(createdAt.toISOString());
      expect(result).not.toBe(createdAt); // Should be a different object
    });
  });

  describe('getUpdatedAt', () => {
    it('should return a copy of the updatedAt date', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');
      const timestamps = CatalogTimestamps.create(createdAt, updatedAt);

      // Act
      const result = timestamps.getUpdatedAt();

      // Assert
      expect(result.toISOString()).toBe(updatedAt.toISOString());
      expect(result).not.toBe(updatedAt); // Should be a different object
    });
  });

  describe('withUpdatedAt', () => {
    it('should return a new CatalogTimestamps with updated updatedAt', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');
      const newUpdatedAt = new Date('2023-01-03T00:00:00Z');
      const timestamps = CatalogTimestamps.create(createdAt, updatedAt);

      // Act
      const newTimestamps = timestamps.withUpdatedAt(newUpdatedAt);

      // Assert
      expect(newTimestamps).not.toBe(timestamps); // Should be a different object
      expect(newTimestamps.getCreatedAt().toISOString()).toBe(
        createdAt.toISOString(),
      );
      expect(newTimestamps.getUpdatedAt().toISOString()).toBe(
        newUpdatedAt.toISOString(),
      );
    });

    it('should throw an error if new updatedAt is not a valid date', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');
      const invalidDate = new Date('invalid-date');
      const timestamps = CatalogTimestamps.create(createdAt, updatedAt);

      // Act & Assert
      expect(() => timestamps.withUpdatedAt(invalidDate)).toThrow(
        'Updated at must be a valid date.',
      );
    });

    it('should throw an error if new updatedAt is earlier than createdAt', () => {
      // Arrange
      const createdAt = new Date('2023-01-02T00:00:00Z');
      const updatedAt = new Date('2023-01-03T00:00:00Z');
      const earlierDate = new Date('2023-01-01T00:00:00Z');
      const timestamps = CatalogTimestamps.create(createdAt, updatedAt);

      // Act & Assert
      expect(() => timestamps.withUpdatedAt(earlierDate)).toThrow(
        'Updated at cannot be earlier than created at.',
      );
    });
  });

  describe('equals', () => {
    it('should return true when comparing timestamps with the same dates', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');
      const timestamps1 = CatalogTimestamps.create(createdAt, updatedAt);
      const timestamps2 = CatalogTimestamps.create(
        new Date('2023-01-01T00:00:00Z'),
        new Date('2023-01-02T00:00:00Z'),
      );

      // Act
      const result = timestamps1.equals(timestamps2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing timestamps with different createdAt', () => {
      // Arrange
      const timestamps1 = CatalogTimestamps.create(
        new Date('2023-01-01T00:00:00Z'),
        new Date('2023-01-03T00:00:00Z'),
      );
      const timestamps2 = CatalogTimestamps.create(
        new Date('2023-01-02T00:00:00Z'),
        new Date('2023-01-03T00:00:00Z'),
      );

      // Act
      const result = timestamps1.equals(timestamps2);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false when comparing timestamps with different updatedAt', () => {
      // Arrange
      const timestamps1 = CatalogTimestamps.create(
        new Date('2023-01-01T00:00:00Z'),
        new Date('2023-01-02T00:00:00Z'),
      );
      const timestamps2 = CatalogTimestamps.create(
        new Date('2023-01-01T00:00:00Z'),
        new Date('2023-01-03T00:00:00Z'),
      );

      // Act
      const result = timestamps1.equals(timestamps2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
