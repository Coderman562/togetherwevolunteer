import { SupabaseClient as GeneralSupabaseClient } from "@supabase/supabase-js"

import { Database } from "./db"

export type SupabaseClient = GeneralSupabaseClient<Database>
