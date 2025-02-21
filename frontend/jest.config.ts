import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-fixed-jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
    '^@/(.*)': '<rootDir>/src/$1',
    '^@app/(.*)': '<rootDir>/src/app/$1',
    '^@shared-components/(.*)': '<rootDir>/src/shared-components/$1',
    '^@features/(.*)': '<rootDir>/src/features/$1',
    '^@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^@services/(.*)': '<rootDir>/src/services/$1',
    '^@type/(.*)': '<rootDir>/src/types/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/app/{layout,providers,routes}.tsx',
    '!src/test-utils/*.{tsx,ts}',
    '!src/reportWebVitals.ts',
    '!src/**/*.test.{tsx,ts}',
  ],
  setupFiles: ['<rootDir>/src/test-utils/dotenv-config.ts'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
export default config;
