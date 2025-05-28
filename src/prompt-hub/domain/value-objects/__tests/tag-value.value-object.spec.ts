import { TagValue } from '../tag-value.value-object';

describe('TagValue', () => {
  describe('create', () => {
    it('should create a valid TagValue with a valid tag', () => {
      // Arrange
      const validTag = 'valid-tag';

      // Act
      const tagValue = TagValue.create(validTag);

      // Assert
      expect(tagValue).toBeDefined();
      expect(tagValue.getValue()).toBe(validTag);
    });

    it('should trim the tag before creating', () => {
      // Arrange
      const validTag = 'valid-tag';
      const tagWithSpaces = `  ${validTag}  `;

      // Act
      const tagValue = TagValue.create(tagWithSpaces);

      // Assert
      expect(tagValue.getValue()).toBe(validTag);
    });

    it('should convert the tag to lowercase', () => {
      // Arrange
      const upperCaseTag = 'VALID-TAG';
      const expectedTag = 'valid-tag';

      // Act
      const tagValue = TagValue.create(upperCaseTag);

      // Assert
      expect(tagValue.getValue()).toBe(expectedTag);
    });

    it('should remove non-alphanumeric characters and hyphens', () => {
      // Arrange
      const tagWithSpecialChars = 'valid@tag!123_+';
      const expectedTag = 'validtag123';

      // Act
      const tagValue = TagValue.create(tagWithSpecialChars);

      // Assert
      expect(tagValue.getValue()).toBe(expectedTag);
    });

    it('should throw an error if the tag is too short', () => {
      // Act & Assert
      expect(() => TagValue.create('')).toThrow(
        'Tag value must be between 1 and 50 characters.',
      );
      expect(() => TagValue.create('  ')).toThrow(
        'Tag value must be between 1 and 50 characters.',
      );
    });

    it('should throw an error if the tag is too long', () => {
      // Arrange
      const longTag = 'a'.repeat(51);

      // Act & Assert
      expect(() => TagValue.create(longTag)).toThrow(
        'Tag value must be between 1 and 50 characters.',
      );
    });

    it('should throw an error if the tag contains no alphanumeric characters after sanitization', () => {
      // Arrange
      const invalidTag = '@#$%^&*()';

      // Act & Assert
      expect(() => TagValue.create(invalidTag)).toThrow(
        'Tag value must contain at least one alphanumeric character.',
      );
    });

    it('should accept a tag with exactly 1 character', () => {
      // Arrange
      const tag = 'a';

      // Act
      const tagValue = TagValue.create(tag);

      // Assert
      expect(tagValue.getValue()).toBe(tag);
    });

    it('should accept a tag with exactly 50 characters', () => {
      // Arrange
      const tag = 'a'.repeat(50);

      // Act
      const tagValue = TagValue.create(tag);

      // Assert
      expect(tagValue.getValue()).toBe(tag);
    });
  });

  describe('getValue', () => {
    it('should return the tag value', () => {
      // Arrange
      const validTag = 'valid-tag';
      const tagValue = TagValue.create(validTag);

      // Act
      const result = tagValue.getValue();

      // Assert
      expect(result).toBe(validTag);
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same tag', () => {
      // Arrange
      const validTag = 'valid-tag';
      const tagValue1 = TagValue.create(validTag);
      const tagValue2 = TagValue.create(validTag);

      // Act
      const result = tagValue1.equals(tagValue2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different tags', () => {
      // Arrange
      const tagValue1 = TagValue.create('tag1');
      const tagValue2 = TagValue.create('tag2');

      // Act
      const result = tagValue1.equals(tagValue2);

      // Assert
      expect(result).toBe(false);
    });

    it('should return true when comparing tags that are different but sanitize to the same value', () => {
      // Arrange
      const tagValue1 = TagValue.create('tag-one');
      const tagValue2 = TagValue.create('TAG-ONE');

      // Act
      const result = tagValue1.equals(tagValue2);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe('getUniqueTags', () => {
    it('should return an empty array when given an empty array', () => {
      // Arrange
      const tags: TagValue[] = [];

      // Act
      const uniqueTags = TagValue.getUniqueTags(tags);

      // Assert
      expect(uniqueTags).toEqual([]);
    });

    it('should return the same array when there are no duplicates', () => {
      // Arrange
      const tags = [
        TagValue.create('tag1'),
        TagValue.create('tag2'),
        TagValue.create('tag3'),
      ];

      // Act
      const uniqueTags = TagValue.getUniqueTags(tags);

      // Assert
      expect(uniqueTags.length).toBe(3);
      expect(uniqueTags[0].getValue()).toBe('tag1');
      expect(uniqueTags[1].getValue()).toBe('tag2');
      expect(uniqueTags[2].getValue()).toBe('tag3');
    });

    it('should filter out duplicate tags', () => {
      // Arrange
      const tags = [
        TagValue.create('tag1'),
        TagValue.create('tag2'),
        TagValue.create('tag1'), // Duplicate
        TagValue.create('tag3'),
        TagValue.create('tag2'), // Duplicate
      ];

      // Act
      const uniqueTags = TagValue.getUniqueTags(tags);

      // Assert
      expect(uniqueTags.length).toBe(3);
      expect(uniqueTags[0].getValue()).toBe('tag1');
      expect(uniqueTags[1].getValue()).toBe('tag2');
      expect(uniqueTags[2].getValue()).toBe('tag3');
    });

    it('should filter out tags that are different but sanitize to the same value', () => {
      // Arrange
      const tags = [
        TagValue.create('tag-one'),
        TagValue.create('TAG-ONE'), // Same as tag-one after sanitization
        TagValue.create('tag-two'),
      ];

      // Act
      const uniqueTags = TagValue.getUniqueTags(tags);

      // Assert
      expect(uniqueTags.length).toBe(2);
      expect(uniqueTags[0].getValue()).toBe('tag-one');
      expect(uniqueTags[1].getValue()).toBe('tag-two');
    });
  });
});
