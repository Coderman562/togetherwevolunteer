"use server"

import {
  createServerSupabaseClient,
  getLoggedInUser,
} from "@/actions/supabase-server"
import { UserService } from "@/actions/user/userService"

import { TablesUpdate } from "@/types/db"
import { NotLoggedInError } from "@/lib/exceptions"

/**
 * Complete the onboarding process for the user
 * @param {TablesUpdate<"users">} userData - Data to update during onboarding
 * @returns {Promise<any>} Updated user data
 */
export async function completeOnboarding(userData: TablesUpdate<"users">) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  const result = await UserService.updateUser(supabase, user.id, {
    ...userData,
    usesAuthentication: true,
    hasCompletedOnboarding: true,
  })
  return result
}
