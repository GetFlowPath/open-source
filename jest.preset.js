const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  clearMocks: true,
  collectCoverageFrom: [
    `**/*.{ts,js}`,
    `packages/**/*.ts`,
    `!**/*.stories.ts`,
    `!**/stories/*`,
    `!**/testing/**`,
    `!**/index.ts`,
    '!**/node_modules/**',
  ],
  coverageReporters: ['text', 'json', 'html'],
};
