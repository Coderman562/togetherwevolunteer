// __mocks__/next/headers.js
export const cookies = jest.fn(() => ({
  get: jest.fn((name) => {
    const allCookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=")
      acc[key] = value
      return acc
    }, {})
    const value = allCookies[name] ? { value: allCookies[name] } : undefined
    // console.log(`GET Cookie: ${name} ->`, value)
    return value
  }),
  set: jest.fn((name, value) => {
    document.cookie = `${name}=${value}`
    // console.log(`SET Cookie: ${name} = ${value}`)
  }),
  delete: jest.fn((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    // console.log(`DELETE Cookie: ${name}`)
  }),
}))
