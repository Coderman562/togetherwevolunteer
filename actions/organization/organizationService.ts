"use server"

import { Tables, TablesInsert, TablesUpdate } from "@/types/db"
import { SupabaseClient } from "@/types/supabase"
import { supabaseAdmin } from "@/lib/supabase/admin"

export class OrganizationService {
  /**
   * Retrieve an organization by specific criteria
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {Object} criteria - The criteria to use for retrieving the organization (e.g., { name: "Organization Name" })
   * @returns {Promise<Object|null>} The organization data if found, or null if not found
   * @throws {Error} If there is an error retrieving the organization
   */
  static async getOrganization(
    supabase: SupabaseClient,
    criteria: Partial<TablesInsert<"organizations">>
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .match(criteria)
      .single()

    if (error && error.code !== "PGRST116") throw error
    return data || null
  }

  /**
   * Create a new organization and add the creating user as an admin
   *
   * @param supabase — The Supabase client
   * @param userId — The ID of the user creating the organization
   * @param organizationDetails — The details of the organization to create
   * @returns — The ID of the created organization
   */
  static async createOrganization(
    supabase: SupabaseClient,
    userId: string,
    organizationDetails: Omit<TablesInsert<"organizations">, "updatedAt">
  ) {
    // Create the organization and get the inserted data
    const organizationData = await this.createOrganizationRecord(supabase, {
      ...organizationDetails,
      updatedAt: new Date().toISOString(),
    })

    const organizationId = organizationData.id

    // Add the user creating the organization as an owner
    await this.addUserAsOwner(userId, organizationId)

    return organizationData
  }

  /**
   * Create a new organization record in the database
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {TablesInsert<"organizations">} organizationDetails - The details of the organization to create
   * @returns {Promise<Object[]>} The data of the created organization
   * @throws {Error} If there is an error creating the organization
   */
  static async createOrganizationRecord(
    supabase: SupabaseClient,
    organizationDetails: TablesInsert<"organizations">
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .insert(organizationDetails)
      .select()
      .single()

    if (error) throw error

    return data
  }

  /**
   * Add the user as an owner to the organization.
   * @param {string} userId - The ID of the user to add as owner.
   * @param {number} organizationId - The ID of the organization.
   * @throws {Error} If there is an error adding the user as an owner.
   */
  private static async addUserAsOwner(
    userId: Tables<"users">["id"],
    organizationId: Tables<"organizations">["id"]
  ) {
    return this.addUserToOrganization(organizationId, userId, "owner", {})
  }

  /**
   * Add a user to an organization.
   * @param {number} organizationId - The ID of the organization.
   * @param {string} userId - The ID of the user.
   * @param {string} role - The role of the user in the organization.
   * @param {Json} registrationData - Additional registration data.
   * @returns {Promise<Object>} The data of the added user.
   * @throws {Error} If there is an error adding the user.
   */
  static async addUserToOrganization(
    organizationId: Tables<"organizations">["id"],
    userId: Tables<"users">["id"],
    role: Tables<"userOrganizations">["role"],
    registrationData: Tables<"userOrganizations">["registrationData"]
  ) {
    const { data, error } = await supabaseAdmin
      .from("userOrganizations")
      .insert({
        organizationId,
        userId,
        registrationData,
        role,
        updatedAt: new Date().toISOString(),
      })
    if (error) throw error
    return data
  }

  /**
   * Upload organization documents
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {TablesInsert<"documents">} documentDetails - The details of the document to upload
   */
  static async uploadOrganizationDocuments(
    supabase: SupabaseClient,
    documentDetails: TablesInsert<"documents">
  ) {
    const { data, error } = await supabase
      .from("documents")
      .insert(documentDetails)
      .single()
    if (error) throw error
    return data
  }

  /**
   * Set organization preferences
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {number} organizationId - The ID of the organization
   * @param {TablesUpdate<"organizations">} preferences - The preferences to set
   */
  static async setOrganizationPreferences(
    supabase: SupabaseClient,
    organizationId: number,
    preferences: TablesUpdate<"organizations">
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .update(preferences)
      .eq("id", organizationId)
      .single()
    if (error) throw error
    return data
  }

  /**
   * Set organization badges and goals
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {TablesInsert<"organizationBadges">[]} badges - The badges to set
   * @param {TablesInsert<"organizationGoals">[]} goals - The goals to set
   */
  static async setOrganizationBadgesGoals(
    supabase: SupabaseClient,
    badges: TablesInsert<"organizationBadges">[],
    goals: TablesInsert<"organizationGoals">[]
  ) {
    const { data: badgeData, error: badgeError } = await supabase
      .from("organizationBadges")
      .insert(badges)
    if (badgeError) throw badgeError

    const { data: goalData, error: goalError } = await supabase
      .from("organizationGoals")
      .insert(goals)
    if (goalError) throw goalError

    return { badgeData, goalData }
  }

  /**
   * Update verification documents
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {number} organizationId - The ID of the organization
   * @param {TablesUpdate<"organizations">["verificationDocuments"]} verificationDocuments - The verification documents to update
   */
  static async updateVerificationDocuments(
    supabase: SupabaseClient,
    organizationId: number,
    verificationDocuments: TablesUpdate<"organizations">["verificationDocuments"]
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .update({ verificationDocuments })
      .eq("id", organizationId)
      .single()
    if (error) throw error
    return data
  }

  /**
   * Update custom hour logging fields
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {number} organizationId - The ID of the organization
   * @param {TablesUpdate<"organizations">["customHourLoggingFields"]} customHourLoggingFields - The custom hour logging fields to update
   */
  static async updateCustomHourLoggingFields(
    supabase: SupabaseClient,
    organizationId: number,
    customHourLoggingFields: TablesUpdate<"organizations">["customHourLoggingFields"]
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .update({ customHourLoggingFields })
      .eq("id", organizationId)
      .single()
    if (error) throw error
    return data
  }

  /**
   * Update volunteer registration fields
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {number} organizationId - The ID of the organization
   * @param {TablesUpdate<"organizations">["volunteerRegistrationFields"]} volunteerRegistrationFields - The volunteer registration fields to update
   */
  static async updateVolunteerRegistrationFields(
    supabase: SupabaseClient,
    organizationId: number,
    volunteerRegistrationFields: TablesUpdate<"organizations">["volunteerRegistrationFields"]
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .update({ volunteerRegistrationFields })
      .eq("id", organizationId)
      .single()
    if (error) throw error
    return data
  }

  /**
   * Update terms and agreements
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {number} organizationId - The ID of the organization
   * @param {TablesUpdate<"organizations">["termsAndAgreements"]} termsAndAgreements - The terms and agreements to update
   */
  static async updateTermsAndAgreements(
    supabase: SupabaseClient,
    organizationId: number,
    termsAndAgreements: TablesUpdate<"organizations">["termsAndAgreements"]
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .update({ termsAndAgreements })
      .eq("id", organizationId)
      .single()
    if (error) throw error
    return data
  }

  /**
   * Update color theme
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {number} organizationId - The ID of the organization
   * @param {TablesUpdate<"organizations">["colorTheme"]} colorTheme - The color theme to update
   */
  static async updateColorTheme(
    supabase: SupabaseClient,
    organizationId: number,
    colorTheme: TablesUpdate<"organizations">["colorTheme"]
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .update({ colorTheme })
      .eq("id", organizationId)
      .single()
    if (error) throw error
    return data
  }

  /**
   * Update site information
   * @param {SupabaseClient} supabase - The Supabase client
   * @param {number} organizationId - The ID of the organization
   * @param {TablesUpdate<"organizations">["siteInformation"]} siteInformation - The site information to update
   */
  static async updateSiteInformation(
    supabase: SupabaseClient,
    organizationId: number,
    siteInformation: TablesUpdate<"organizations">["siteInformation"]
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .update({ siteInformation })
      .eq("id", organizationId)
      .single()
    if (error) throw error
    return data
  }
}
