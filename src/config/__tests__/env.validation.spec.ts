import { validate } from '../env.validation';

describe('Environment Validation', () => {
  it('should validate correct environment variables', () => {
    const mockEnv = {
      NODE_ENV: 'development',
      PORT: 3000,
      APP_URL: 'http://localhost:3000',
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: 'postgres',
      POSTGRES_DB: 'prompt_hub',
      DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/prompt_hub',
      REDIS_HOST: 'localhost',
      REDIS_PORT: 6379,
      ELASTICSEARCH_NODE: 'http://localhost:9200',
      JWT_SECRET: 'test-secret',
      GOOGLE_CLIENT_ID: '',
      GOOGLE_CLIENT_SECRET: '',
    };

    const result = validate(mockEnv);
    expect(result).toEqual(mockEnv);
  });

  it('should throw an error for missing required environment variables', () => {
    const mockEnv = {
      NODE_ENV: 'development',
      PORT: 3000,
      // Missing APP_URL and other required variables
    };

    expect(() => validate(mockEnv)).toThrow('Environment validation error');
  });

  it('should throw an error for invalid environment variables', () => {
    const mockEnv = {
      NODE_ENV: 'invalid', // Invalid value
      PORT: 3000,
      APP_URL: 'http://localhost:3000',
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: 'postgres',
      POSTGRES_DB: 'prompt_hub',
      DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/prompt_hub',
      REDIS_HOST: 'localhost',
      REDIS_PORT: 6379,
      ELASTICSEARCH_NODE: 'http://localhost:9200',
      JWT_SECRET: 'test-secret',
    };

    expect(() => validate(mockEnv)).toThrow('Environment validation error');
  });

  it('should use default values for missing optional environment variables', () => {
    const mockEnv = {
      // NODE_ENV is missing but has a default value
      // PORT is missing but has a default value
      APP_URL: 'http://localhost:3000',
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: 'postgres',
      POSTGRES_DB: 'prompt_hub',
      DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/prompt_hub',
      REDIS_HOST: 'localhost',
      // REDIS_PORT is missing but has a default value
      ELASTICSEARCH_NODE: 'http://localhost:9200',
      JWT_SECRET: 'test-secret',
    };

    const result = validate(mockEnv);
    expect(result.NODE_ENV).toBe('development');
    expect(result.PORT).toBe(3000);
    expect(result.REDIS_PORT).toBe(6379);
  });
});
