module.exports = {
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverage: true,
  testMatch: ["**/__tests__/**/*.test.js"],
  verbose: true,
  silent: true, // Suppresses warnings in Jest output
};

// filepath: /home/mohamed/Documents/Library Management System/backend/__tests__/app.test.js
const sum = (a, b) => a + b;

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
