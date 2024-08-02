import { cookies } from "next/headers"
import { createServerSupabaseClient } from "@/actions/supabase-server"
import { AuthApiError } from "@supabase/supabase-js"

import { supabaseAdmin } from "../supabase/admin"

export const createTestingUser = async () => {
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.createUser({
    email: "jamezjaquez69@gmail.com",
    password: "Testpassword1!",
    user_metadata: { name: "" },
    email_confirm: true,
  })

  if (error instanceof AuthApiError && error.code === "email_exists") {
    console.log("User already exists, using existing user")
    const user = await loginTestingUser()

    if (!user) throw new Error("Could not login testing user")

    return user.user.id
  }

  if (error) throw new Error(error.message)
  if (!user) throw new Error("Could not create testing user")

  return user.id
}

export const loginTestingUser = async () => {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "jamezjaquez69@gmail.com",
      password: "Testpassword1!",
    })
    if (error) {
      console.error(error)
      throw new Error(error.message)
    }

    // For testing, set the next/auth cookie
    setSupabaseCookie(data.session)
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteTestingUser = async () => {
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", "jamezjaquez69@gmail.com")
    .single()

  if (!user) throw new Error("User not found")

  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(user.id)
  const result = await supabaseAdmin.from("users").delete().eq("id", user.id)

  logout()
}

const setSupabaseCookie = (session: any) => {
  if (session) {
    cookies().set("sb-access-token", session.access_token, {
      maxAge: session.expires_in,
      path: "/",
    })
    cookies().set("sb-refresh-token", session.refresh_token, {
      maxAge: session.expires_in,
      path: "/",
    })
    // TODO: iamrkftjgskyosholbwj is the database name. Change to use the name from the env.
    cookies().set(
      "sb-iamrkftjgskyosholbwj-auth-token",
      JSON.stringify({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at,
        user: session.user,
      }),
      {
        maxAge: session.expires_in,
        path: "/",
      }
    )
  }
}

export const logout = () => {
  const expireNow = new Date(0) // Set the expiry date to the past to clear the cookies
  cookies().set("sb-access-token", "", { expires: expireNow, path: "/" })
  cookies().set("sb-refresh-token", "", { expires: expireNow, path: "/" })
  cookies().set("sb-iamrkftjgskyosholbwj-auth-token", "", {
    expires: expireNow,
    path: "/",
  })
}
