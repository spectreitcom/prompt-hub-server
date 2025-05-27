import { TagValue } from '../tag-value.value-object';

describe('TagValue', () => {
  describe('create', () => {
    it('should create a valid TagValue with a valid value', () => {
      // Arrange
      const validValue = 'valid-tag';
      
      // Act
      const tagValue = TagValue.create(validValue);
      
      // Assert
      expect(tagValue).toBeDefined();
      expect(tagValue.getValue()).toBe(validValue);
    });

    it('should trim the value before creating', () => {
      // Arrange
      const validValue = 'valid-tag';
      const valueWithSpaces = `  ${validValue}  `;
      
      // Act
      const tagValue = TagValue.create(valueWithSpaces);
      
      // Assert
      expect(tagValue.getValue()).toBe(validValue);
    });

    it('should convert to lowercase', () => {
      // Arrange
      const upperCaseValue = 'VALID-TAG';
      
      // Act
      const tagValue = TagValue.create(upperCaseValue);
      
      // Assert
      expect(tagValue.getValue()).toBe(upperCaseValue.toLowerCase());
    });

    it('should remove invalid characters', () => {
      // Arrange
      const valueWithInvalidChars = 'valid@tag!123';
      
      // Act
      const tagValue = TagValue.create(valueWithInvalidChars);
      
      // Assert
      expect(tagValue.getValue()).toBe('validtag123');
    });

    it('should throw an error if the value is too short', () => {
      // Act & Assert
      expect(() => TagValue.create('')).toThrow('Tag value must be between 1 and 50 characters.');
      expect(() => TagValue.create('  ')).toThrow('Tag value must be between 1 and 50 characters.');
    });

    it('should throw an error if the value is too long', () => {
      // Arrange
      const longValue = 'a'.repeat(51);
      
      // Act & Assert
      expect(() => TagValue.create(longValue)).toThrow('Tag value must be between 1 and 50 characters.');
    });

    it('should throw an error if the value contains only invalid characters', () => {
      // Act & Assert
      expect(() => TagValue.create('@#$%')).toThrow('Tag value must contain at least one alphanumeric character.');
    });

    it('should accept a value with exactly 1 character', () => {
      // Arrange
      const value = 'a';
      
      // Act
      const tagValue = TagValue.create(value);
      
      // Assert
      expect(tagValue.getValue()).toBe(value);
    });

    it('should accept a value with exactly 50 characters', () => {
      // Arrange
      const value = 'a'.repeat(50);
      
      // Act
      const tagValue = TagValue.create(value);
      
      // Assert
      expect(tagValue.getValue()).toBe(value);
    });
  });

  describe('getValue', () => {
    it('should return the tag value', () => {
      // Arrange
      const validValue = 'valid-tag';
      const tagValue = TagValue.create(validValue);
      
      // Act
      const result = tagValue.getValue();
      
      // Assert
      expect(result).toBe(validValue);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same value', () => {
      // Arrange
      const validValue = 'valid-tag';
      const tagValue1 = TagValue.create(validValue);
      const tagValue2 = TagValue.create(validValue);
      
      // Act
      const result = tagValue1.equals(tagValue2);
      
      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different values', () => {
      // Arrange
      const tagValue1 = TagValue.create('tag1');
      const tagValue2 = TagValue.create('tag2');
      
      // Act
      const result = tagValue1.equals(tagValue2);
      
      // Assert
      expect(result).toBe(false);
    });
  });
});