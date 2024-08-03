"use server"

import {
  acceptInvitation,
  inviteUserAsAdmin,
  inviteUserAsVolunteer,
  sendEmailInvitations,
} from "@/actions/invitations/invitationActions"

import { supabaseAdmin } from "@/lib/supabase/admin"
import { resetDb } from "@/lib/supabase/reset"
import { createTestingUser, loginTestingUser, logout } from "@/lib/testing/auth"

import { createOrganization } from "../organization/organizationActions"

describe("Invitations Actions", () => {
  let testingOrganizationId: number
  let adminUserId: string

  beforeAll(async () => {
    await resetDb()
    await createTestingUser()
    adminUserId = (await loginTestingUser())?.user.id
    testingOrganizationId = (
      await createOrganization({
        name: "testing organization",
        slug: "testing-organization",
      })
    ).id
  })

  beforeEach(async () => {
    await loginTestingUser()
  })

  afterAll(async () => {
    await resetDb()
    await logout()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  test("inviteUserAsVolunteer - should create a volunteer invitation", async () => {
    const invitationDetails = {
      invitedEmail: "testvolunteer@example.com",
      organizationId: testingOrganizationId,
    }

    const { id: invitationId } = await inviteUserAsVolunteer(invitationDetails)

    const { data, error } = await supabaseAdmin
      .from("organizationInvitations")
      .select("*")
      .eq("id", invitationId)
      .eq("role", "volunteer")
      .single()

    expect(error).toBeNull()
    expect(data).toBeDefined()
    expect(data?.invitedEmail).toBe(invitationDetails.invitedEmail)
    expect(data?.role).toBe("volunteer")
    expect(data?.status).toBe("pending")
  })

  test("inviteUserAsAdmin - should create an admin invitation", async () => {
    const invitationDetails = {
      invitedEmail: "newtestvolunteer@example.com",
      organizationId: testingOrganizationId,
    }

    await inviteUserAsAdmin(invitationDetails)

    const { data, error } = await supabaseAdmin
      .from("organizationInvitations")
      .select("*")
      .eq("invitedEmail", invitationDetails.invitedEmail)
      .eq("role", "admin")
      .single()

    expect(error).toBeNull()
    expect(data).toBeDefined()
    expect(data?.invitedEmail).toBe(invitationDetails.invitedEmail)
    expect(data?.role).toBe("admin")
    expect(data?.status).toBe("pending")
  })

  test("inviteUserAsVolunteer and acceptInvitation - should create volunteer invitation and new user should accept an invitation and be added to organization successfully", async () => {
    const userInvitedEmail = "testvolunteer@example.com"
    const invitationDetails = {
      invitedEmail: userInvitedEmail,
      organizationId: testingOrganizationId,
    }

    const { id: invitationId } = await inviteUserAsVolunteer(invitationDetails)

    const { data: invitationData, error: invitationError } = await supabaseAdmin
      .from("organizationInvitations")
      .select("*")
      .eq("id", invitationId)
      .eq("role", "volunteer")
      .single()

    if (!invitationData) throw new Error("invitation not properly created")

    // Switch login session to be new user being invited to organization
    logout()
    await createTestingUser(userInvitedEmail)
    const result = await loginTestingUser(userInvitedEmail)
    const user = result?.user

    if (!user) throw new Error("User not properly created")

    const registrationData = { testField: "test" }

    await acceptInvitation(invitationId, registrationData)

    // Check that user was added to organization as volunteer
    const { data, error } = await supabaseAdmin
      .from("userOrganizations")
      .select("*")
      .eq("userId", user.id)
      .eq("organizationId", testingOrganizationId)
      .single()

    expect(error).toBeNull()
    expect(data).toBeDefined()
    expect(data?.registrationData).toEqual(registrationData)
    expect(data?.role).toBe("volunteer")

    // Check that invitation status was updated to accepted
    const { data: updatedInvitation } = await supabaseAdmin
      .from("organizationInvitations")
      .select("*")
      .eq("id", invitationId)
      .single()

    expect(updatedInvitation?.status).toBe("accepted")
    expect(updatedInvitation?.adminWhoInvitedId).toBe(adminUserId)
  })
})
