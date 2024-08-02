import { cookies } from "next/headers"

describe("getCookieValue", () => {
  // Biggest thing was to create this document Object
  beforeEach(() => {
    const document = {
      cookie: "test=isfun",
    }
    // forces the obj we just created to act like the "document" we are familiar with
    global.document.cookie = document.cookie
  })

  afterAll(async () => {
    jest.clearAllMocks()
    // await deleteTestingUser()
    // await cleanDatabase()
  })

  it("returns cookie value when found", () => {
    const result = cookies().get("test")
    console.log(result)
    expect(result?.value).toBe("isfun")
  })

  it("returns undefined when value not found", () => {
    const result = cookies().get("fail")
    expect(result).toBeUndefined()
  })
})
