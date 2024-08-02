// jest.config.mjs
import { createRequire } from "module"
import nextJest from "next/jest.js"

const require = createRequire(import.meta.url)

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

const baseConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: ["<rootDir>/e2e"],
  transformIgnorePatterns: ["node_modules/(?!(module-to-transform)/)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "next/headers": "<rootDir>/__mocks__/next/headers.ts",
    // 🧑🏻‍🔧 FIX Problem here
    // 🧑🏻‍🔧 resolve react module with the next.js inset one.
    react: "next/dist/compiled/react/cjs/react.development.js",
    // Jose fix from https://stackoverflow.com/questions/76608600/jest-tests-are-failing-because-of-an-unknown-unexpected-token-export
    "^jose$": require.resolve("jose"),
    "^@panva/hkdf$": require.resolve("@panva/hkdf"),
    "^preact-render-to-string$": require.resolve("preact-render-to-string"),
    "^preact$": require.resolve("preact"),
    "^uuid$": require.resolve("uuid"),
  },
  transformIgnorePatterns: ["node_modules/(?!(jose)/)"],
  preset: "ts-jest",
  testEnvironment: "node",
}

const clientTestConfig = {
  displayName: "client",
  // testMatch: ["/**/*.clienttest.[jt]s?(x)"],
  testEnvironment: "jest-environment-jsdom",
}

const serverTestConfig = {
  displayName: "server",
  testMatch: ["/**/*.servertest.[jt]s?(x)"],
  testEnvironment: "jest-environment-node",
}

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  projects: [
    await createJestConfig({ ...baseConfig, ...clientTestConfig })(),
    // await createJestConfig({ ...baseConfig, ...serverTestConfig })(),
  ],
}

export default config
