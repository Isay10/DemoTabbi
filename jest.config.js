/** Jest config — pure logic only, no React Native rendering. */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
};
