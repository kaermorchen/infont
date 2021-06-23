module.exports = {
  roots: ['<rootDir>/tests'],
  testMatch: [
    "**/*.ts"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
