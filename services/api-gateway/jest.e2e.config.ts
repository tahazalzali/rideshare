export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/test/e2e/**/*.e2e-spec.ts'],
  moduleNameMapper: { '^@rides/common$': '<rootDir>/../../libs/common/src/index.ts' },
  testTimeout: 30000
}
