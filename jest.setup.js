;
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";





// Jose fix from https://stackoverflow.com/questions/76608600/jest-tests-are-failing-because-of-an-unknown-unexpected-token-export
const { TextEncoder, TextDecoder } = require("util")
Object.assign(global, { TextDecoder, TextEncoder })

process.env.NEXT_PUBLIC_IS_TESTING = true

// Suppress a supabase instance console.warn message
beforeAll(() => {
  const originalWarn = console.warn
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Multiple GoTrueClient instances detected")
    ) {
      return
    }
    originalWarn(...args)
  }
})