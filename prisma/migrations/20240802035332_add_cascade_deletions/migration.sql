/*
  Warnings:

  - Added the required column `eventActivityId` to the `activityTimeSlots` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_programId_fkey";

-- DropForeignKey
ALTER TABLE "activityRegistrations" DROP CONSTRAINT "activityRegistrations_activityId_fkey";

-- DropForeignKey
ALTER TABLE "activityRegistrations" DROP CONSTRAINT "activityRegistrations_userId_fkey";

-- DropForeignKey
ALTER TABLE "activityTimeSlots" DROP CONSTRAINT "activityTimeSlots_activityId_fkey";

-- DropForeignKey
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "communicationLogs" DROP CONSTRAINT "communicationLogs_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "communicationLogs" DROP CONSTRAINT "communicationLogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "communications" DROP CONSTRAINT "communications_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_eventId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_programId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_userId_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_userId_fkey";

-- DropForeignKey
ALTER TABLE "eventActivities" DROP CONSTRAINT "eventActivities_eventId_fkey";

-- DropForeignKey
ALTER TABLE "eventRegistrations" DROP CONSTRAINT "eventRegistrations_activityId_fkey";

-- DropForeignKey
ALTER TABLE "eventRegistrations" DROP CONSTRAINT "eventRegistrations_adminVerifiedId_fkey";

-- DropForeignKey
ALTER TABLE "eventRegistrations" DROP CONSTRAINT "eventRegistrations_eventId_fkey";

-- DropForeignKey
ALTER TABLE "eventRegistrations" DROP CONSTRAINT "eventRegistrations_timeSlotId_fkey";

-- DropForeignKey
ALTER TABLE "eventRegistrations" DROP CONSTRAINT "eventRegistrations_userId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_programId_fkey";

-- DropForeignKey
ALTER TABLE "feedbackAndSurveys" DROP CONSTRAINT "feedbackAndSurveys_eventId_fkey";

-- DropForeignKey
ALTER TABLE "feedbackAndSurveys" DROP CONSTRAINT "feedbackAndSurveys_userId_fkey";

-- DropForeignKey
ALTER TABLE "hoursLogged" DROP CONSTRAINT "hoursLogged_activityId_fkey";

-- DropForeignKey
ALTER TABLE "hoursLogged" DROP CONSTRAINT "hoursLogged_adminDeniedById_fkey";

-- DropForeignKey
ALTER TABLE "hoursLogged" DROP CONSTRAINT "hoursLogged_adminVerifiedById_fkey";

-- DropForeignKey
ALTER TABLE "hoursLogged" DROP CONSTRAINT "hoursLogged_eventActivityId_fkey";

-- DropForeignKey
ALTER TABLE "hoursLogged" DROP CONSTRAINT "hoursLogged_eventId_fkey";

-- DropForeignKey
ALTER TABLE "hoursLogged" DROP CONSTRAINT "hoursLogged_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "hoursLogged" DROP CONSTRAINT "hoursLogged_programId_fkey";

-- DropForeignKey
ALTER TABLE "hoursLogged" DROP CONSTRAINT "hoursLogged_userId_fkey";

-- DropForeignKey
ALTER TABLE "organizationBadges" DROP CONSTRAINT "organizationBadges_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "organizationGoals" DROP CONSTRAINT "organizationGoals_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "organizationInvitations" DROP CONSTRAINT "organizationInvitations_adminWhoInvitedId_fkey";

-- DropForeignKey
ALTER TABLE "organizationInvitations" DROP CONSTRAINT "organizationInvitations_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "organizationInvitations" DROP CONSTRAINT "organizationInvitations_userWhoAcceptedId_fkey";

-- DropForeignKey
ALTER TABLE "programs" DROP CONSTRAINT "programs_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "volunteersJoining" DROP CONSTRAINT "volunteersJoining_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "volunteersJoining" DROP CONSTRAINT "volunteersJoining_userId_fkey";

-- AlterTable
ALTER TABLE "activityTimeSlots" ADD COLUMN     "eventActivityId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "volunteersJoining" ADD CONSTRAINT "volunteersJoining_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteersJoining" ADD CONSTRAINT "volunteersJoining_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationInvitations" ADD CONSTRAINT "organizationInvitations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationInvitations" ADD CONSTRAINT "organizationInvitations_adminWhoInvitedId_fkey" FOREIGN KEY ("adminWhoInvitedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationInvitations" ADD CONSTRAINT "organizationInvitations_userWhoAcceptedId_fkey" FOREIGN KEY ("userWhoAcceptedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventActivities" ADD CONSTRAINT "eventActivities_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityTimeSlots" ADD CONSTRAINT "activityTimeSlots_eventActivityId_fkey" FOREIGN KEY ("eventActivityId") REFERENCES "eventActivities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventRegistrations" ADD CONSTRAINT "eventRegistrations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventRegistrations" ADD CONSTRAINT "eventRegistrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventRegistrations" ADD CONSTRAINT "eventRegistrations_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "eventActivities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventRegistrations" ADD CONSTRAINT "eventRegistrations_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "activityTimeSlots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventRegistrations" ADD CONSTRAINT "eventRegistrations_adminVerifiedId_fkey" FOREIGN KEY ("adminVerifiedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communicationLogs" ADD CONSTRAINT "communicationLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communicationLogs" ADD CONSTRAINT "communicationLogs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbackAndSurveys" ADD CONSTRAINT "feedbackAndSurveys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbackAndSurveys" ADD CONSTRAINT "feedbackAndSurveys_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityRegistrations" ADD CONSTRAINT "activityRegistrations_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityRegistrations" ADD CONSTRAINT "activityRegistrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoursLogged" ADD CONSTRAINT "hoursLogged_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoursLogged" ADD CONSTRAINT "hoursLogged_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoursLogged" ADD CONSTRAINT "hoursLogged_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoursLogged" ADD CONSTRAINT "hoursLogged_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoursLogged" ADD CONSTRAINT "hoursLogged_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoursLogged" ADD CONSTRAINT "hoursLogged_eventActivityId_fkey" FOREIGN KEY ("eventActivityId") REFERENCES "eventActivities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoursLogged" ADD CONSTRAINT "hoursLogged_adminVerifiedById_fkey" FOREIGN KEY ("adminVerifiedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoursLogged" ADD CONSTRAINT "hoursLogged_adminDeniedById_fkey" FOREIGN KEY ("adminDeniedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communications" ADD CONSTRAINT "communications_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationGoals" ADD CONSTRAINT "organizationGoals_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationBadges" ADD CONSTRAINT "organizationBadges_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
