import { cookies, headers } from "next/headers"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/db"
import { Post, User } from "@/types/main"

export const createServerSupabaseClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

export async function getSupabaseSession() {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getAuthUser() {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getUser() {
  const supabase = createServerSupabaseClient()
  try {
    const { data } = await supabase.from("users").select("*").single()
    return data
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getUserSubscription() {
  const supabase = createServerSupabaseClient()
  try {
    const { data } = await supabase
      .from("users")
      .select(
        "stripe_subscription_id, stripe_current_period_end, stripe_customer_id, stripe_price_id"
      )
      .single()
    return data
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getPostsInfo() {
  const supabase = createServerSupabaseClient()
  try {
    const { data } = await supabase
      .from("posts")
      .select("id, title, published, created_at")
      .order("updated_at", { ascending: false })
    return data
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .eq("author_id", userId)
    .single()
  return data? { ...data, content: data.content as unknown as JSON } : null
}
