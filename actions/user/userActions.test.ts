"server only"

import { deleteAccount, updateAccount } from "@/actions/user/userActions"

import {
  createTestingUser,
  deleteTestingUser,
  loginTestingUser,
  logout,
} from "@/lib/testing/auth"

import { createServerSupabaseClient, getLoggedInUser } from "../supabase-server"

describe("Test User Actions", () => {
  beforeAll(async () => {
    await createTestingUser()
    const user = await loginTestingUser()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  test("get users - should return only personal user data", async () => {
    const supabase = createServerSupabaseClient()

    const { data } = await supabase.from("users").select("*")
  })

  test("updateUser - should update user data", async () => {
    const mockUpdateData = { name: "Test User" }

    const result = await updateAccount(mockUpdateData)

    const user = await getLoggedInUser()

    expect(result).toEqual("success")
    expect(user?.name).toEqual(mockUpdateData.name)
  })

  test("deleteUser - should delete user data", async () => {
    const loggedInUser = await loginTestingUser()
    const user = await getLoggedInUser()

    const result = await deleteAccount()

    const deletedUser = await getLoggedInUser()
    expect(deletedUser).toBeNull()
  })
})
