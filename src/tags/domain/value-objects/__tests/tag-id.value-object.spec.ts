import { TagId } from '../tag-id.value-object';

describe('TagId', () => {
  describe('create', () => {
    it('should create a valid TagId with a valid id', () => {
      // Arrange
      const validId = 'valid-id';
      
      // Act
      const tagId = TagId.create(validId);
      
      // Assert
      expect(tagId).toBeDefined();
      expect(tagId.getValue()).toBe(validId);
    });

    it('should trim the id before creating', () => {
      // Arrange
      const validId = 'valid-id';
      const idWithSpaces = `  ${validId}  `;
      
      // Act
      const tagId = TagId.create(idWithSpaces);
      
      // Assert
      expect(tagId.getValue()).toBe(validId);
    });

    it('should throw an error if the id is empty', () => {
      // Act & Assert
      expect(() => TagId.create('')).toThrow('Tag ID cannot be empty.');
      expect(() => TagId.create('  ')).toThrow('Tag ID cannot be empty.');
    });
  });

  describe('getValue', () => {
    it('should return the tag id', () => {
      // Arrange
      const validId = 'valid-id';
      const tagId = TagId.create(validId);
      
      // Act
      const result = tagId.getValue();
      
      // Assert
      expect(result).toBe(validId);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same id', () => {
      // Arrange
      const validId = 'valid-id';
      const tagId1 = TagId.create(validId);
      const tagId2 = TagId.create(validId);
      
      // Act
      const result = tagId1.equals(tagId2);
      
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different ids', () => {
      // Arrange
      const tagId1 = TagId.create('id1');
      const tagId2 = TagId.create('id2');
      
      // Act
      const result = tagId1.equals(tagId2);
      
      // Assert
      expect(result).toBe(false);
    });
  });
});