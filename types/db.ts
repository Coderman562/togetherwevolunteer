export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      activities: {
        Row: {
          createdAt: string
          customFieldsEnabled: boolean
          customHourLoggingFields: Json | null
          description: string | null
          id: number
          location: string | null
          name: string
          organizationId: number
          programId: number
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          customFieldsEnabled?: boolean
          customHourLoggingFields?: Json | null
          description?: string | null
          id?: number
          location?: string | null
          name: string
          organizationId: number
          programId: number
          updatedAt: string
        }
        Update: {
          createdAt?: string
          customFieldsEnabled?: boolean
          customHourLoggingFields?: Json | null
          description?: string | null
          id?: number
          location?: string | null
          name?: string
          organizationId?: number
          programId?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_programId_fkey"
            columns: ["programId"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      activityRegistrations: {
        Row: {
          activityId: number
          id: number
          registeredAt: string
          status: string
          userId: string
        }
        Insert: {
          activityId: number
          id?: number
          registeredAt?: string
          status: string
          userId: string
        }
        Update: {
          activityId?: number
          id?: number
          registeredAt?: string
          status?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "activityRegistrations_activityId_fkey"
            columns: ["activityId"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activityRegistrations_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      activityTimeSlots: {
        Row: {
          activityId: number
          createdAt: string
          endTime: string
          id: number
          startTime: string
          updatedAt: string
        }
        Insert: {
          activityId: number
          createdAt?: string
          endTime: string
          id?: number
          startTime: string
          updatedAt: string
        }
        Update: {
          activityId?: number
          createdAt?: string
          endTime?: string
          id?: number
          startTime?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "activityTimeSlots_activityId_fkey"
            columns: ["activityId"]
            isOneToOne: false
            referencedRelation: "eventActivities"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          createdAt: string
          description: string | null
          endDate: string
          goalAmount: number
          id: number
          name: string
          organizationId: number
          startDate: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          endDate: string
          goalAmount: number
          id?: number
          name: string
          organizationId: number
          startDate: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          endDate?: string
          goalAmount?: number
          id?: number
          name?: string
          organizationId?: number
          startDate?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      communicationLogs: {
        Row: {
          content: string
          id: number
          organizationId: number
          sentAt: string
          status: string
          type: string
          userId: string
        }
        Insert: {
          content: string
          id?: number
          organizationId: number
          sentAt: string
          status: string
          type: string
          userId: string
        }
        Update: {
          content?: string
          id?: number
          organizationId?: number
          sentAt?: string
          status?: string
          type?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "communicationLogs_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communicationLogs_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communications: {
        Row: {
          createdAt: string
          description: string | null
          emailBody: string
          emailSubject: string
          id: number
          name: string
          nextSendTime: string
          organizationId: number
          recurrencePattern: string | null
          scheduleTime: string
          scheduleType: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          emailBody: string
          emailSubject: string
          id?: number
          name: string
          nextSendTime: string
          organizationId: number
          recurrencePattern?: string | null
          scheduleTime: string
          scheduleType: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          emailBody?: string
          emailSubject?: string
          id?: number
          name?: string
          nextSendTime?: string
          organizationId?: number
          recurrencePattern?: string | null
          scheduleTime?: string
          scheduleType?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "communications_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          description: string | null
          documentType: string
          eventId: number | null
          filePath: string
          id: number
          name: string
          organizationId: number
          programId: number | null
          uploadedAt: string
          userId: string
        }
        Insert: {
          description?: string | null
          documentType: string
          eventId?: number | null
          filePath: string
          id?: number
          name: string
          organizationId: number
          programId?: number | null
          uploadedAt?: string
          userId: string
        }
        Update: {
          description?: string | null
          documentType?: string
          eventId?: number | null
          filePath?: string
          id?: number
          name?: string
          organizationId?: number
          programId?: number | null
          uploadedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_programId_fkey"
            columns: ["programId"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          campaignId: number | null
          currency: string
          donationDate: string
          id: number
          organizationId: number
          paymentMethod: string
          userId: string
        }
        Insert: {
          amount: number
          campaignId?: number | null
          currency: string
          donationDate: string
          id?: number
          organizationId: number
          paymentMethod: string
          userId: string
        }
        Update: {
          amount?: number
          campaignId?: number | null
          currency?: string
          donationDate?: string
          id?: number
          organizationId?: number
          paymentMethod?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "donations_campaignId_fkey"
            columns: ["campaignId"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      eventActivities: {
        Row: {
          createdAt: string
          description: string | null
          documents: Json | null
          eventId: number
          id: number
          minAgeRequirement: number | null
          name: string
          otherRequirements: Json | null
          requiredRegistrationFields: Json | null
          updatedAt: string
          wysiwygContent: Json | null
        }
        Insert: {
          createdAt?: string
          description?: string | null
          documents?: Json | null
          eventId: number
          id?: number
          minAgeRequirement?: number | null
          name: string
          otherRequirements?: Json | null
          requiredRegistrationFields?: Json | null
          updatedAt: string
          wysiwygContent?: Json | null
        }
        Update: {
          createdAt?: string
          description?: string | null
          documents?: Json | null
          eventId?: number
          id?: number
          minAgeRequirement?: number | null
          name?: string
          otherRequirements?: Json | null
          requiredRegistrationFields?: Json | null
          updatedAt?: string
          wysiwygContent?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "eventActivities_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      eventRegistrations: {
        Row: {
          activityId: number | null
          adminVerifiedId: string | null
          attended: boolean
          eventId: number
          guestCount: number | null
          guests: Json | null
          id: number
          registeredAt: string
          status: string
          timeSlotId: number | null
          userId: string
          verifiedAt: string | null
        }
        Insert: {
          activityId?: number | null
          adminVerifiedId?: string | null
          attended?: boolean
          eventId: number
          guestCount?: number | null
          guests?: Json | null
          id?: number
          registeredAt?: string
          status: string
          timeSlotId?: number | null
          userId: string
          verifiedAt?: string | null
        }
        Update: {
          activityId?: number | null
          adminVerifiedId?: string | null
          attended?: boolean
          eventId?: number
          guestCount?: number | null
          guests?: Json | null
          id?: number
          registeredAt?: string
          status?: string
          timeSlotId?: number | null
          userId?: string
          verifiedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eventRegistrations_activityId_fkey"
            columns: ["activityId"]
            isOneToOne: false
            referencedRelation: "eventActivities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventRegistrations_adminVerifiedId_fkey"
            columns: ["adminVerifiedId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventRegistrations_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventRegistrations_timeSlotId_fkey"
            columns: ["timeSlotId"]
            isOneToOne: false
            referencedRelation: "activityTimeSlots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventRegistrations_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          createdAt: string
          description: string | null
          endTime: string
          id: number
          location: string | null
          name: string
          organizationId: number
          programId: number | null
          recurrenceEndDate: string | null
          recurrencePattern: string | null
          registrationEmailTemplate: string | null
          startTime: string
          updatedAt: string
          wysiwygContent: Json | null
        }
        Insert: {
          createdAt?: string
          description?: string | null
          endTime: string
          id?: number
          location?: string | null
          name: string
          organizationId: number
          programId?: number | null
          recurrenceEndDate?: string | null
          recurrencePattern?: string | null
          registrationEmailTemplate?: string | null
          startTime: string
          updatedAt: string
          wysiwygContent?: Json | null
        }
        Update: {
          createdAt?: string
          description?: string | null
          endTime?: string
          id?: number
          location?: string | null
          name?: string
          organizationId?: number
          programId?: number | null
          recurrenceEndDate?: string | null
          recurrencePattern?: string | null
          registrationEmailTemplate?: string | null
          startTime?: string
          updatedAt?: string
          wysiwygContent?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_programId_fkey"
            columns: ["programId"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      feedbackAndSurveys: {
        Row: {
          eventId: number | null
          feedbackText: string
          id: number
          rating: number
          submittedAt: string
          userId: string
        }
        Insert: {
          eventId?: number | null
          feedbackText: string
          id?: number
          rating: number
          submittedAt?: string
          userId: string
        }
        Update: {
          eventId?: number | null
          feedbackText?: string
          id?: number
          rating?: number
          submittedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedbackAndSurveys_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedbackAndSurveys_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      hoursLogged: {
        Row: {
          activityId: number | null
          adminDeniedById: string | null
          adminVerifiedById: string | null
          approvedAt: string | null
          customFields: Json | null
          date: string
          eventActivityId: number | null
          eventId: number | null
          hours: number
          id: number
          loggedAt: string
          notes: string | null
          organizationId: number
          programId: number | null
          reasonDenied: string | null
          status: string
          userId: string
        }
        Insert: {
          activityId?: number | null
          adminDeniedById?: string | null
          adminVerifiedById?: string | null
          approvedAt?: string | null
          customFields?: Json | null
          date: string
          eventActivityId?: number | null
          eventId?: number | null
          hours: number
          id?: number
          loggedAt?: string
          notes?: string | null
          organizationId: number
          programId?: number | null
          reasonDenied?: string | null
          status: string
          userId: string
        }
        Update: {
          activityId?: number | null
          adminDeniedById?: string | null
          adminVerifiedById?: string | null
          approvedAt?: string | null
          customFields?: Json | null
          date?: string
          eventActivityId?: number | null
          eventId?: number | null
          hours?: number
          id?: number
          loggedAt?: string
          notes?: string | null
          organizationId?: number
          programId?: number | null
          reasonDenied?: string | null
          status?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "hoursLogged_activityId_fkey"
            columns: ["activityId"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hoursLogged_adminDeniedById_fkey"
            columns: ["adminDeniedById"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hoursLogged_adminVerifiedById_fkey"
            columns: ["adminVerifiedById"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hoursLogged_eventActivityId_fkey"
            columns: ["eventActivityId"]
            isOneToOne: false
            referencedRelation: "eventActivities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hoursLogged_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hoursLogged_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hoursLogged_programId_fkey"
            columns: ["programId"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hoursLogged_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizationBadges: {
        Row: {
          color: string | null
          createdAt: string
          description: string | null
          id: number
          image: string | null
          name: string
          organizationId: number
          requiredHours: number
          updatedAt: string
        }
        Insert: {
          color?: string | null
          createdAt?: string
          description?: string | null
          id?: number
          image?: string | null
          name: string
          organizationId: number
          requiredHours: number
          updatedAt: string
        }
        Update: {
          color?: string | null
          createdAt?: string
          description?: string | null
          id?: number
          image?: string | null
          name?: string
          organizationId?: number
          requiredHours?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizationBadges_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizationGoals: {
        Row: {
          createdAt: string
          currentProgress: number
          description: string | null
          endDate: string
          id: number
          organizationId: number
          startDate: string
          target: number
          title: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          currentProgress?: number
          description?: string | null
          endDate: string
          id?: number
          organizationId: number
          startDate: string
          target: number
          title: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          currentProgress?: number
          description?: string | null
          endDate?: string
          id?: number
          organizationId?: number
          startDate?: string
          target?: number
          title?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizationGoals_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizationInvitations: {
        Row: {
          acceptedAt: string | null
          adminWhoInvitedId: string
          id: number
          invitedAt: string
          invitedEmail: string
          organizationId: number
          permissions: Json | null
          role: string
          status: string
          userWhoAcceptedId: string | null
        }
        Insert: {
          acceptedAt?: string | null
          adminWhoInvitedId: string
          id?: number
          invitedAt?: string
          invitedEmail: string
          organizationId: number
          permissions?: Json | null
          role: string
          status: string
          userWhoAcceptedId?: string | null
        }
        Update: {
          acceptedAt?: string | null
          adminWhoInvitedId?: string
          id?: number
          invitedAt?: string
          invitedEmail?: string
          organizationId?: number
          permissions?: Json | null
          role?: string
          status?: string
          userWhoAcceptedId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizationInvitations_adminWhoInvitedId_fkey"
            columns: ["adminWhoInvitedId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizationInvitations_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizationInvitations_userWhoAcceptedId_fkey"
            columns: ["userWhoAcceptedId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          city: string | null
          colorTheme: Json | null
          contactEmail: string | null
          contactPhone: string | null
          country: string | null
          createdAt: string
          customHourLoggingFields: Json | null
          description: string | null
          id: number
          logoUrl: string | null
          name: string
          openingHours: Json | null
          postalCode: string | null
          registrationNumber: string | null
          requiresVolunteerApproval: boolean | null
          siteInformation: Json | null
          socialFacebook: string | null
          socialInstagram: string | null
          socialLinkedin: string | null
          socialTiktok: string | null
          socialTwitter: string | null
          socialYelp: string | null
          socialYoutube: string | null
          state: string | null
          stripeCurrentPeriodEnd: string | null
          stripeCustomerId: string | null
          stripePriceId: string | null
          stripeSubscriptionId: string | null
          taxId: string | null
          termsAndAgreements: Json | null
          updatedAt: string
          verificationDocuments: Json | null
          verificationStatus: string | null
          volunteerRegistrationFields: Json | null
          websiteUrl: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          colorTheme?: Json | null
          contactEmail?: string | null
          contactPhone?: string | null
          country?: string | null
          createdAt?: string
          customHourLoggingFields?: Json | null
          description?: string | null
          id?: number
          logoUrl?: string | null
          name: string
          openingHours?: Json | null
          postalCode?: string | null
          registrationNumber?: string | null
          requiresVolunteerApproval?: boolean | null
          siteInformation?: Json | null
          socialFacebook?: string | null
          socialInstagram?: string | null
          socialLinkedin?: string | null
          socialTiktok?: string | null
          socialTwitter?: string | null
          socialYelp?: string | null
          socialYoutube?: string | null
          state?: string | null
          stripeCurrentPeriodEnd?: string | null
          stripeCustomerId?: string | null
          stripePriceId?: string | null
          stripeSubscriptionId?: string | null
          taxId?: string | null
          termsAndAgreements?: Json | null
          updatedAt: string
          verificationDocuments?: Json | null
          verificationStatus?: string | null
          volunteerRegistrationFields?: Json | null
          websiteUrl?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          colorTheme?: Json | null
          contactEmail?: string | null
          contactPhone?: string | null
          country?: string | null
          createdAt?: string
          customHourLoggingFields?: Json | null
          description?: string | null
          id?: number
          logoUrl?: string | null
          name?: string
          openingHours?: Json | null
          postalCode?: string | null
          registrationNumber?: string | null
          requiresVolunteerApproval?: boolean | null
          siteInformation?: Json | null
          socialFacebook?: string | null
          socialInstagram?: string | null
          socialLinkedin?: string | null
          socialTiktok?: string | null
          socialTwitter?: string | null
          socialYelp?: string | null
          socialYoutube?: string | null
          state?: string | null
          stripeCurrentPeriodEnd?: string | null
          stripeCustomerId?: string | null
          stripePriceId?: string | null
          stripeSubscriptionId?: string | null
          taxId?: string | null
          termsAndAgreements?: Json | null
          updatedAt?: string
          verificationDocuments?: Json | null
          verificationStatus?: string | null
          volunteerRegistrationFields?: Json | null
          websiteUrl?: string | null
        }
        Relationships: []
      }
      programs: {
        Row: {
          colors: Json
          createdAt: string
          customFieldsEnabled: boolean
          customHourLoggingFields: Json | null
          description: string | null
          endDate: string
          id: number
          name: string
          organizationId: number
          startDate: string
          updatedAt: string
        }
        Insert: {
          colors: Json
          createdAt?: string
          customFieldsEnabled: boolean
          customHourLoggingFields?: Json | null
          description?: string | null
          endDate: string
          id?: number
          name: string
          organizationId: number
          startDate: string
          updatedAt: string
        }
        Update: {
          colors?: Json
          createdAt?: string
          customFieldsEnabled?: boolean
          customHourLoggingFields?: Json | null
          description?: string | null
          endDate?: string
          id?: number
          name?: string
          organizationId?: number
          startDate?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      userOrganizations: {
        Row: {
          createdAt: string
          id: number
          organizationId: number
          permissions: Json | null
          registrationData: Json | null
          role: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          organizationId: number
          permissions?: Json | null
          registrationData?: Json | null
          role: string
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          organizationId?: number
          permissions?: Json | null
          registrationData?: Json | null
          role?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "userOrganizations_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userOrganizations_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address: string | null
          age: number | null
          availability: Json | null
          certifications: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          email_verified: string | null
          emergencyContactName: string | null
          emergencyContactPhone: string | null
          hasCompletedOnboarding: boolean
          id: string
          image: string | null
          name: string | null
          notificationPreferences: Json | null
          phoneNumber: string | null
          postalCode: string | null
          skills: string | null
          state: string | null
          totalHours: number | null
          updated_at: string | null
          usesAuthentication: boolean
        }
        Insert: {
          address?: string | null
          age?: number | null
          availability?: Json | null
          certifications?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          email_verified?: string | null
          emergencyContactName?: string | null
          emergencyContactPhone?: string | null
          hasCompletedOnboarding?: boolean
          id?: string
          image?: string | null
          name?: string | null
          notificationPreferences?: Json | null
          phoneNumber?: string | null
          postalCode?: string | null
          skills?: string | null
          state?: string | null
          totalHours?: number | null
          updated_at?: string | null
          usesAuthentication?: boolean
        }
        Update: {
          address?: string | null
          age?: number | null
          availability?: Json | null
          certifications?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          email_verified?: string | null
          emergencyContactName?: string | null
          emergencyContactPhone?: string | null
          hasCompletedOnboarding?: boolean
          id?: string
          image?: string | null
          name?: string | null
          notificationPreferences?: Json | null
          phoneNumber?: string | null
          postalCode?: string | null
          skills?: string | null
          state?: string | null
          totalHours?: number | null
          updated_at?: string | null
          usesAuthentication?: boolean
        }
        Relationships: []
      }
      volunteersJoining: {
        Row: {
          id: number
          organizationId: number
          registrationData: Json
          requestedAt: string
          reviewedAt: string | null
          reviewedBy: string | null
          status: string
          userId: string
        }
        Insert: {
          id?: number
          organizationId: number
          registrationData: Json
          requestedAt?: string
          reviewedAt?: string | null
          reviewedBy?: string | null
          status: string
          userId: string
        }
        Update: {
          id?: number
          organizationId?: number
          registrationData?: Json
          requestedAt?: string
          reviewedAt?: string | null
          reviewedBy?: string | null
          status?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteersJoining_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteersJoining_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
