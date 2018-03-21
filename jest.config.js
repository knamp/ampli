module.exports = {
  coverageThreshold: {
    global: {
      // branches: 80,
      // functions: 80,
      // lines: 80,
      // statements: 80,
    },
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/__tests__/**',
    '!**/dist/**',
    '!**/jest.config.js',
    '!**/tsconfig.json',
    '!**/tslint.json',
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  testMatch: [
    '**/__tests__/*.test.ts?(x)'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}



