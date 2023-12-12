const nextJest = require('next/jest.js');
 
const createJestConfig = nextJest({
  dir: './',
})
 
/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: "ts-jest",
}
 
module.exports = createJestConfig(config)


/*
 moduleNameMapper: {
    'compactDecrypt': require.resolve('./jwe/compact/decrypt.js'),
  },
*/