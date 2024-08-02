"server only"

import { createClient } from "@supabase/supabase-js"

import { env } from "@/env.mjs"

if (!process.env.NEXT_PUBLIC_SUPABASE_URL)
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY")

export const supabaseAdmin = process.env.NEXT_PUBLIC_IS_TESTING
  ? // Fixes testing error when env thinks env variables are being used on client
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  : createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
