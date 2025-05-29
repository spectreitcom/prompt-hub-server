import { PromptInstruction } from '../prompt-instruction.value-object';

describe('PromptInstruction', () => {
  describe('create', () => {
    it('should create a valid PromptInstruction with valid instruction', () => {
      // Arrange
      const validInstruction = 'This is a valid prompt instruction.';

      // Act
      const promptInstruction = PromptInstruction.create(validInstruction);

      // Assert
      expect(promptInstruction).toBeDefined();
      expect(promptInstruction.getValue()).toBe(validInstruction);
    });

    it('should create a PromptInstruction with null value when input is null', () => {
      // Act
      const promptInstruction = PromptInstruction.create(null);

      // Assert
      expect(promptInstruction).toBeDefined();
      expect(promptInstruction.getValue()).toBeNull();
    });

    it('should trim the instruction before creating', () => {
      // Arrange
      const validInstruction = 'This is a valid prompt instruction.';
      const instructionWithSpaces = `  ${validInstruction}  `;

      // Act
      const promptInstruction = PromptInstruction.create(instructionWithSpaces);

      // Assert
      expect(promptInstruction.getValue()).toBe(validInstruction);
    });

    it('should set value to null if the instruction is empty after trimming', () => {
      // Act
      const promptInstruction1 = PromptInstruction.create('');
      const promptInstruction2 = PromptInstruction.create('   ');

      // Assert
      expect(promptInstruction1.getValue()).toBeNull();
      expect(promptInstruction2.getValue()).toBeNull();
    });

    it('should throw an error if the instruction is too long', () => {
      // Arrange
      const longInstruction = 'a'.repeat(1001);

      // Act & Assert
      expect(() => PromptInstruction.create(longInstruction)).toThrow(
        'Prompt instruction is too long.',
      );
    });

    it('should accept instruction with exactly 1000 characters', () => {
      // Arrange
      const instruction = 'a'.repeat(1000);

      // Act
      const promptInstruction = PromptInstruction.create(instruction);

      // Assert
      expect(promptInstruction.getValue()).toBe(instruction);
    });
  });

  describe('getValue', () => {
    it('should return the instruction value', () => {
      // Arrange
      const validInstruction = 'This is a valid prompt instruction.';
      const promptInstruction = PromptInstruction.create(validInstruction);

      // Act
      const result = promptInstruction.getValue();

      // Assert
      expect(result).toBe(validInstruction);
    });

    it('should return null when the instruction value is null', () => {
      // Arrange
      const promptInstruction = PromptInstruction.create(null);

      // Act
      const result = promptInstruction.getValue();

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('equals', () => {
    it('should return true when comparing the same instruction', () => {
      // Arrange
      const validInstruction = 'This is a valid prompt instruction.';
      const promptInstruction1 = PromptInstruction.create(validInstruction);
      const promptInstruction2 = PromptInstruction.create(validInstruction);

      // Act
      const result = promptInstruction1.equals(promptInstruction2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when comparing different instructions', () => {
      // Arrange
      const promptInstruction1 = PromptInstruction.create('Instruction 1');
      const promptInstruction2 = PromptInstruction.create('Instruction 2');

      // Act
      const result = promptInstruction1.equals(promptInstruction2);

      // Assert
      expect(result).toBe(false);
    });

    it('should return true when comparing two null instructions', () => {
      // Arrange
      const promptInstruction1 = PromptInstruction.create(null);
      const promptInstruction2 = PromptInstruction.create(null);

      // Act
      const result = promptInstruction1.equals(promptInstruction2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return true when comparing empty string and null instructions', () => {
      // Arrange
      const promptInstruction1 = PromptInstruction.create('');
      const promptInstruction2 = PromptInstruction.create(null);

      // Act
      const result = promptInstruction1.equals(promptInstruction2);

      // Assert
      expect(result).toBe(true);
    });
  });
});
