import { PromptTimestamps } from '../prompt-timestamps.value-object';

describe('PromptTimestamps', () => {
  describe('create', () => {
    it('should create a valid PromptTimestamps with valid dates', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');

      // Act
      const promptTimestamps = PromptTimestamps.create(createdAt, updatedAt);

      // Assert
      expect(promptTimestamps).toBeDefined();
      expect(promptTimestamps.getCreatedAt().toISOString()).toBe(
        createdAt.toISOString(),
      );
      expect(promptTimestamps.getUpdatedAt().toISOString()).toBe(
        updatedAt.toISOString(),
      );
    });

    it('should throw an error if createdAt is not a valid date', () => {
      // Arrange
      const createdAt = new Date('invalid-date');
      const updatedAt = new Date('2023-01-02T00:00:00Z');

      // Act & Assert
      expect(() => PromptTimestamps.create(createdAt, updatedAt)).toThrow(
        'Created at must be a valid date.',
      );
    });

    it('should throw an error if updatedAt is not a valid date', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('invalid-date');

      // Act & Assert
      expect(() => PromptTimestamps.create(createdAt, updatedAt)).toThrow(
        'Updated at must be a valid date.',
      );
    });

    it('should throw an error if updatedAt is earlier than createdAt', () => {
      // Arrange
      const createdAt = new Date('2023-01-02T00:00:00Z');
      const updatedAt = new Date('2023-01-01T00:00:00Z');

      // Act & Assert
      expect(() => PromptTimestamps.create(createdAt, updatedAt)).toThrow(
        'Updated at cannot be earlier than created at.',
      );
    });

    it('should accept when updatedAt is equal to createdAt', () => {
      // Arrange
      const date = new Date('2023-01-01T00:00:00Z');

      // Act
      const promptTimestamps = PromptTimestamps.create(date, date);

      // Assert
      expect(promptTimestamps.getCreatedAt().toISOString()).toBe(
        date.toISOString(),
      );
      expect(promptTimestamps.getUpdatedAt().toISOString()).toBe(
        date.toISOString(),
      );
    });
  });

  describe('createNew', () => {
    it('should create a new PromptTimestamps with current date', () => {
      // Arrange
      const before = new Date();

      // Act
      const promptTimestamps = PromptTimestamps.createNew();

      // Assert
      const after = new Date();
      const createdAt = promptTimestamps.getCreatedAt();
      const updatedAt = promptTimestamps.getUpdatedAt();

      expect(createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
      expect(updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(updatedAt.getTime()).toBeLessThanOrEqual(after.getTime());
      expect(createdAt.getTime()).toBe(updatedAt.getTime());
    });
  });

  describe('getCreatedAt', () => {
    it('should return a copy of the createdAt date', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');
      const promptTimestamps = PromptTimestamps.create(createdAt, updatedAt);

      // Act
      const result = promptTimestamps.getCreatedAt();

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
      const promptTimestamps = PromptTimestamps.create(createdAt, updatedAt);

      // Act
      const result = promptTimestamps.getUpdatedAt();

      // Assert
      expect(result.toISOString()).toBe(updatedAt.toISOString());
      expect(result).not.toBe(updatedAt); // Should be a different object
    });
  });

  describe('withUpdatedAt', () => {
    it('should return a new PromptTimestamps with updated updatedAt', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');
      const newUpdatedAt = new Date('2023-01-03T00:00:00Z');
      const promptTimestamps = PromptTimestamps.create(createdAt, updatedAt);

      // Act
      const result = promptTimestamps.withUpdatedAt(newUpdatedAt);

      // Assert
      expect(result).not.toBe(promptTimestamps); // Should be a different object
      expect(result.getCreatedAt().toISOString()).toBe(createdAt.toISOString());
      expect(result.getUpdatedAt().toISOString()).toBe(
        newUpdatedAt.toISOString(),
      );
    });

    it('should throw an error if new updatedAt is not a valid date', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');
      const promptTimestamps = PromptTimestamps.create(createdAt, updatedAt);
      const newUpdatedAt = new Date('invalid-date');

      // Act & Assert
      expect(() => promptTimestamps.withUpdatedAt(newUpdatedAt)).toThrow(
        'Updated at must be a valid date.',
      );
    });

    it('should throw an error if new updatedAt is earlier than createdAt', () => {
      // Arrange
      const createdAt = new Date('2023-01-02T00:00:00Z');
      const updatedAt = new Date('2023-01-03T00:00:00Z');
      const promptTimestamps = PromptTimestamps.create(createdAt, updatedAt);
      const newUpdatedAt = new Date('2023-01-01T00:00:00Z');

      // Act & Assert
      expect(() => promptTimestamps.withUpdatedAt(newUpdatedAt)).toThrow(
        'Updated at cannot be earlier than created at.',
      );
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same timestamps', () => {
      // Arrange
      const createdAt = new Date('2023-01-01T00:00:00Z');
      const updatedAt = new Date('2023-01-02T00:00:00Z');
      const promptTimestamps1 = PromptTimestamps.create(createdAt, updatedAt);
      const promptTimestamps2 = PromptTimestamps.create(
        new Date(createdAt.getTime()),
        new Date(updatedAt.getTime()),
      );

      // Act
      const result = promptTimestamps1.equals(promptTimestamps2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different timestamps', () => {
      // Arrange
      const promptTimestamps1 = PromptTimestamps.create(
        new Date('2023-01-01T00:00:00Z'),
        new Date('2023-01-02T00:00:00Z'),
      );
      const promptTimestamps2 = PromptTimestamps.create(
        new Date('2023-01-01T00:00:00Z'),
        new Date('2023-01-03T00:00:00Z'),
      );

      // Act
      const result = promptTimestamps1.equals(promptTimestamps2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
