export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
  moduleNameMapper: { '^@rides/common$': '<rootDir>/../../libs/common/src/index.ts' }
}
