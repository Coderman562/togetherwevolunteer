import { createServerSupabaseClient } from "@/actions/supabase-server";
import { supabaseAdmin } from "./admin";


export const resetDb = async () => {
  console.log("Resetting database...");

    const {
      data: { users },
      error,
    } = await supabaseAdmin.auth.admin.listUsers({ perPage: 10000 })

    for (const user of users) {
      await supabaseAdmin.auth.admin.deleteUser(user.id)
    }

  const { data: rpcData, error: rpcError } = await supabaseAdmin.rpc("delete_all_rows")

  console.log("RPC error:", rpcError)

  console.log("Database reset complete.");
}