import {
  createOrganization,
  getOrganization,
  setOrganizationBadgesGoals,
  setOrganizationPreferences,
  updateColorTheme,
  updateCustomHourLoggingFields,
  updateSiteInformation,
  updateTermsAndAgreements,
  updateVerificationDocuments,
  updateVolunteerRegistrationFields,
  uploadOrganizationDocuments,
} from "@/actions/organization/organizationActions"
import {
  createServerSupabaseClient,
  getLoggedInUser,
} from "@/actions/supabase-server"

import { NotLoggedInError } from "@/lib/exceptions"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { resetDb } from "@/lib/supabase/reset"
import {
  createTestingUser,
  deleteTestingUser,
  loginTestingUser,
  logout,
} from "@/lib/testing/auth"

describe("Organization Server Actions Tests", () => {
  let organizationId: number

  beforeAll(async () => {
    await resetDb()

    await createTestingUser()
  })

  beforeEach(async () => {
    await loginTestingUser()
  })

  afterAll(async () => {
    await resetDb()
    logout()
  })

  describe("getOrganization", () => {
    test("should create and retrieve organization data based on criteria", async () => {
      const organizationDetails = {
        name: "Test Organization",
        slug: "test-organization",
        description: "A new organization for testing.",
      }
      await createOrganization(organizationDetails)

      const criteria = { name: "Test Organization" }
      const organization = await getOrganization(criteria)
      expect(organization).toHaveProperty("name", "Test Organization")
    })

    test("should return null if no organization matches criteria", async () => {
      const criteria = { name: "Nonexistent Organization" }
      const organization = await getOrganization(criteria)
      expect(organization).toBeNull()
    })
  })

  describe("createOrganization", () => {
    test("should create a new organization", async () => {
      const organizationDetails = {
        name: "New Organization",
        slug: "new-organization",
        description: "A new organization for testing.",
      }
      const organization = await createOrganization(organizationDetails)

      const { data: createdOrganization } = await supabaseAdmin
        .from("organizations")
        .select("*")
        .eq("id", organization.id)
        .single()

      console.log(createdOrganization)

      expect(organization).toHaveProperty("name", "New Organization")
      expect(createdOrganization).toHaveProperty("name", "New Organization")
    })

    test("should throw NotLoggedInError if user is not logged in", async () => {
      logout()
      await expect(
        createOrganization({ name: "Test", slug: "test" })
      ).rejects.toThrow(NotLoggedInError)
      await loginTestingUser()
    })
  })

  // describe("uploadOrganizationDocuments", () => {
  //   test("should upload documents for an organization", async () => {
  //     const documentDetails = {
  //       organizationId: 1,
  //       name: "Test Document",
  //       description: "A document for testing.",
  //       filePath: "path/to/file",
  //     }
  //     const result = await uploadOrganizationDocuments(documentDetails)
  //     expect(result).toHaveProperty("name", "Test Document")
  //   })
  // })

  // describe("setOrganizationPreferences", () => {
  //   test("should update organization preferences", async () => {
  //     const organizationId = 1
  //     const preferences = { requiresVolunteerApproval: true }
  //     const result = await setOrganizationPreferences(
  //       organizationId,
  //       preferences
  //     )
  //     expect(result).toHaveProperty("requiresVolunteerApproval", true)
  //   })
  // })

  // describe("setOrganizationBadgesGoals", () => {
  //   test("should set badges and goals for an organization", async () => {
  //     const badges = [{ name: "New Badge", requiredHours: 10 }]
  //     const goals = [{ title: "New Goal", target: 100 }]
  //     const result = await setOrganizationBadgesGoals(badges, goals)
  //     expect(result).toHaveLength(2)
  //   })
  // })

  // describe("updateVerificationDocuments", () => {
  //   test("should update verification documents for an organization", async () => {
  //     const organizationId = 1
  //     const verificationDocuments = { documents: ["document1", "document2"] }
  //     const result = await updateVerificationDocuments(
  //       organizationId,
  //       verificationDocuments
  //     )
  //     expect(result).toHaveProperty("verificationDocuments")
  //   })
  // })

  // describe("updateCustomHourLoggingFields", () => {
  //   test("should update custom hour logging fields for an organization", async () => {
  //     const organizationId = 1
  //     const customHourLoggingFields = { fields: ["field1", "field2"] }
  //     const result = await updateCustomHourLoggingFields(
  //       organizationId,
  //       customHourLoggingFields
  //     )
  //     expect(result).toHaveProperty("customHourLoggingFields")
  //   })
  // })

  // describe("updateVolunteerRegistrationFields", () => {
  //   test("should update volunteer registration fields for an organization", async () => {
  //     const organizationId = 1
  //     const volunteerRegistrationFields = { fields: ["field1", "field2"] }
  //     const result = await updateVolunteerRegistrationFields(
  //       organizationId,
  //       volunteerRegistrationFields
  //     )
  //     expect(result).toHaveProperty("volunteerRegistrationFields")
  //   })
  // })

  // describe("updateTermsAndAgreements", () => {
  //   test("should update terms and agreements for an organization", async () => {
  //     const organizationId = 1
  //     const termsAndAgreements = { text: "New terms and agreements." }
  //     const result = await updateTermsAndAgreements(
  //       organizationId,
  //       termsAndAgreements
  //     )
  //     expect(result).toHaveProperty("termsAndAgreements")
  //   })
  // })

  // describe("updateColorTheme", () => {
  //   test("should update color theme for an organization", async () => {
  //     const organizationId = 1
  //     const colorTheme = { primary: "#ff0000" }
  //     const result = await updateColorTheme(organizationId, colorTheme)
  //     expect(result).toHaveProperty("colorTheme")
  //   })
  // })

  // describe("updateSiteInformation", () => {
  //   test("should update site information for an organization", async () => {
  //     const organizationId = 1
  //     const siteInformation = { url: "https://newsite.com" }
  //     const result = await updateSiteInformation(
  //       organizationId,
  //       siteInformation
  //     )
  //     expect(result).toHaveProperty("siteInformation")
  //   })
  // })
})
