"server only"

import { Tables, TablesInsert, TablesUpdate } from "@/types/db"
import { SupabaseClient } from "@/types/supabase"
import { supabaseAdmin } from "@/lib/supabase/admin"

export class UserService {
  /**
   * Get user by ID
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {string} userId - The user ID
   * @returns {Promise<any>} User data
   */
  static async getUserById(supabase: SupabaseClient, userId: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
    if (error) throw error
    return data
  }

  /**
   * Update user information
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {string} userId - The user ID
   * @param {TablesUpdate<"users">} userData - Data to update
   * @returns {Promise<any>} Updated user data
   */
  static async updateUser(
    supabase: SupabaseClient,
    userId: string,
    userData: TablesUpdate<"users">
  ) {
    const { error } = await supabase
      .from("users")
      .update(userData)
      .eq("id", userId)
    if (error) throw error
    return "success"
  }

  /**
   * Delete user by ID
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {string} userId - The user ID
   * @returns {Promise<any>} Deleted user data
   */
  static async deleteUser(supabase: SupabaseClient, userId: string) {
    const { error: userError } = await supabase
      .from("users")
      .delete()
      .eq("id", userId)
    if (userError) throw userError

    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    )
    if (authError) throw authError

    return "success"
  }
}
