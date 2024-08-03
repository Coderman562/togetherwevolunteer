"use server"

import { Json, Tables, TablesInsert, TablesUpdate } from "@/types/db"
import { SupabaseClient } from "@/types/supabase"
import { supabaseAdmin } from "@/lib/supabase/admin"

import { OrganizationService } from "../organization/organizationService"

export class InvitationsService {
  /**
   * Invite a user as a volunteer
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {string} userId - The admin user's ID (inviting user)
   * @param {Object} invitationDetails - The invitation details
   */
  static async inviteUserAsVolunteer(
    supabase: SupabaseClient,
    adminWhoInvitedId: Tables<"users">["id"],
    invitationDetails: Omit<
      TablesInsert<"organizationInvitations">,
      "adminWhoInvitedId" | "status" | "invitedAt" | "invitedById" | "role"
    >
  ) {
    const updatedInvitationDetails = {
      ...invitationDetails,
      role: "volunteer" as TablesInsert<"organizationInvitations">["role"],
      adminWhoInvitedId,
    }
    const data = this.inviteUser(supabase, updatedInvitationDetails)
    return data
  }

  /**
   * Invite a user to be an admin
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {string} userId - The admin user's ID (inviting user)
   * @param {Object} invitationDetails - The invitation details
   */
  static async inviteUserAsAdmin(
    supabase: SupabaseClient,
    adminWhoInvitedId: Tables<"users">["id"],
    invitationDetails: Omit<
      TablesInsert<"organizationInvitations">,
      "adminWhoInvitedId" | "status" | "invitedAt" | "invitedById" | "role"
    >
  ) {
    const updatedInvitationDetails = {
      ...invitationDetails,
      role: "admin" as TablesInsert<"organizationInvitations">["role"],
      adminWhoInvitedId,
    }
    const data = this.inviteUser(supabase, updatedInvitationDetails)
    return data
  }

  private static async inviteUser(
    supabase: SupabaseClient,
    invitationDetails: Omit<TablesInsert<"organizationInvitations">, "status">
  ) {
    const updatedInvitationDetails = {
      ...invitationDetails,
      status: "pending" as TablesInsert<"organizationInvitations">["status"],
      invitedAt: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from("organizationInvitations")
      .insert(updatedInvitationDetails)
      .select()
      .single()
    if (error) throw error
    return data
  }

  /**
   * Accept an invitation
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {string} userAcceptingId - The user accepting the invitation
   * @param {number} invitationId - The invitation ID
   */
  static async acceptInvitation(
    supabase: SupabaseClient,
    userAcceptingId: Tables<"users">["id"],
    invitationId: number,
    registrationData: Tables<"userOrganizations">["registrationData"]
  ) {
    const { data: invitation, error: invitationError } = await supabase
      .from("organizationInvitations")
      .select("id, role, organizationId")
      .eq("id", invitationId)
      .single()

    if (invitationError || !invitation) throw new Error("Invalid invitation ID")

    await OrganizationService.addUserToOrganization(
      invitation.organizationId,
      userAcceptingId,
      invitation.role,
      registrationData
    )
    await this.markInvitationAsAccepted(userAcceptingId, invitationId)
  }

  private static async markInvitationAsAccepted(
    userWhoAcceptedId: Tables<"users">["id"],
    invitationId: number
  ) {
    const { data, error } = await supabaseAdmin
      .from("organizationInvitations")
      .update({
        status: "accepted",
        acceptedAt: new Date().toISOString(),
        userWhoAcceptedId,
      })
      .eq("id", invitationId)
    if (error) throw error
    return data
  }
}
