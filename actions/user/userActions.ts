"use server"

import {
  createServerSupabaseClient,
  getLoggedInUser,
} from "@/actions/supabase-server"

import { TablesInsert, TablesUpdate } from "@/types/db"
import { NotLoggedInError } from "@/lib/exceptions"

import { UserService } from "./userService"

/**
 * Update user information
 * @param {string} userId - The user ID
 * @param {TablesUpdate<"users">} userData - Data to update
 * @returns {Promise<any>} Updated user data
 */
export async function updateAccount(userData: TablesUpdate<"users">) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()
  const result = await UserService.updateUser(supabase, user.id, userData)
  return result
}

/**
 * Delete user by ID
 * @param {string} userId - The user ID
 * @returns {Promise<any>} Deleted user data
 */
export async function deleteAccount() {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()
  const result = await UserService.deleteUser(supabase, user.id)
  return result
}
