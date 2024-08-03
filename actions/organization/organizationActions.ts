"use server"

import {
  createServerSupabaseClient,
  getLoggedInUser,
} from "@/actions/supabase-server"

import { TablesInsert, TablesUpdate } from "@/types/db"
import { NotLoggedInError } from "@/lib/exceptions"

import { OrganizationService } from "./organizationService"

/**
 * Retrieve an organization by specific criteria.
 * @param criteria - The criteria to use for retrieving the organization.
 * @returns A promise that resolves to the organization data if found, or null if not found.
 * @throws NotLoggedInError if the user is not logged in.
 */
export async function getOrganization(
  criteria: Partial<TablesInsert<"organizations">>
) {
  const supabase = createServerSupabaseClient()
  return OrganizationService.getOrganization(supabase, criteria)
}

export async function createOrganization(
  organizationDetails: Omit<TablesInsert<"organizations">, "updatedAt">
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  return OrganizationService.createOrganization(
    supabase,
    user.id,
    organizationDetails
  )
}

export async function uploadOrganizationDocuments(
  documentDetails: TablesInsert<"documents">
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  return OrganizationService.uploadOrganizationDocuments(
    supabase,
    documentDetails
  )
}

export async function setOrganizationPreferences(
  organizationId: number,
  preferences: TablesUpdate<"organizations">
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  return OrganizationService.setOrganizationPreferences(
    supabase,
    organizationId,
    preferences
  )
}

export async function setOrganizationBadgesGoals(
  badges: TablesInsert<"organizationBadges">[],
  goals: TablesInsert<"organizationGoals">[]
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  return OrganizationService.setOrganizationBadgesGoals(supabase, badges, goals)
}

export async function updateVerificationDocuments(
  organizationId: number,
  verificationDocuments: TablesUpdate<"organizations">["verificationDocuments"]
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  return OrganizationService.updateVerificationDocuments(
    supabase,
    organizationId,
    verificationDocuments
  )
}

export async function updateCustomHourLoggingFields(
  organizationId: number,
  customHourLoggingFields: TablesUpdate<"organizations">["customHourLoggingFields"]
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  return OrganizationService.updateCustomHourLoggingFields(
    supabase,
    organizationId,
    customHourLoggingFields
  )
}

export async function updateVolunteerRegistrationFields(
  organizationId: number,
  volunteerRegistrationFields: TablesUpdate<"organizations">["volunteerRegistrationFields"]
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  return OrganizationService.updateVolunteerRegistrationFields(
    supabase,
    organizationId,
    volunteerRegistrationFields
  )
}

export async function updateTermsAndAgreements(
  organizationId: number,
  termsAndAgreements: TablesUpdate<"organizations">["termsAndAgreements"]
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  return OrganizationService.updateTermsAndAgreements(
    supabase,
    organizationId,
    termsAndAgreements
  )
}

export async function updateColorTheme(
  organizationId: number,
  colorTheme: TablesUpdate<"organizations">["colorTheme"]
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  return OrganizationService.updateColorTheme(
    supabase,
    organizationId,
    colorTheme
  )
}

export async function updateSiteInformation(
  organizationId: number,
  siteInformation: TablesUpdate<"organizations">["siteInformation"]
) {
  const supabase = createServerSupabaseClient()
  const user = await getLoggedInUser()
  if (!user) throw new NotLoggedInError()

  return OrganizationService.updateSiteInformation(
    supabase,
    organizationId,
    siteInformation
  )
}
