"use server"

import {
  createServerSupabaseClient,
  getLoggedInUser,
} from "@/actions/supabase-server"

import { TablesInsert, TablesUpdate } from "@/types/db"
import { NotLoggedInError } from "@/lib/exceptions"

import { InvitationsService } from "./invitationService"

/**
 * Invite a user as a volunteer
 * @param {RequiredInvitationDetails} invitationDetails - The invitation details
 */
export async function inviteUserAsVolunteer(
  invitationDetails: Omit<
    TablesInsert<"organizationInvitations">,
    "adminWhoInvitedId" | "status" | "invitedAt" | "invitedById" | "role"
  >
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()
  return await InvitationsService.inviteUserAsVolunteer(
    supabase,
    user.id,
    invitationDetails
  )
}

/**
 * Invite a user as an admin
 * @param {RequiredInvitationDetails} invitationDetails - The invitation details
 */
export async function inviteUserAsAdmin(
  invitationDetails: Omit<
    TablesInsert<"organizationInvitations">,
    "adminWhoInvitedId" | "status" | "invitedAt" | "invitedById" | "role"
  >
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()
  return await InvitationsService.inviteUserAsAdmin(
    supabase,
    user.id,
    invitationDetails
  )
}

/**
 * Accept an invitation
 * @param {number} invitationId - The invitation ID
 */
export async function acceptInvitation(
  invitationId: number,
  registrationData: TablesUpdate<"userOrganizations">["registrationData"] = {}
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()
  return await InvitationsService.acceptInvitation(
    supabase,
    user.id,
    invitationId,
    registrationData
  )
}
