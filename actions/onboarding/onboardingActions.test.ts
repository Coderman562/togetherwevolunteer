"server only"

import { deleteAccount, updateAccount } from "@/actions/user/userActions"

import {
  createTestingUser,
  deleteTestingUser,
  loginTestingUser,
  logout,
} from "@/lib/testing/auth"

import { createServerSupabaseClient, getLoggedInUser } from "../supabase-server"
import { completeOnboarding } from "./onboardingActions"

describe("Test Onboarding Actions", () => {
  beforeAll(async () => {
    await createTestingUser()
    const user = await loginTestingUser()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  test("updateUser - should update user data and set authentication and completedOnboarding values", async () => {
    const mockUpdateData = { name: "Test User" }

    const result = await completeOnboarding(mockUpdateData)

    const user = await getLoggedInUser()

    expect(result).toEqual("success")
    expect(user?.name).toEqual(mockUpdateData.name)
    expect(user?.usesAuthentication).toEqual(true)
    expect(user?.hasCompletedOnboarding).toEqual(true)
  })
})
