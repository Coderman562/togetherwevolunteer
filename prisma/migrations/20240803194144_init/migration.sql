/*
  Warnings:

  - Changed the type of `status` on the `organizationInvitations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('pending', 'accepted', 'rejected', 'expired');

-- AlterTable
ALTER TABLE "organizationInvitations" DROP COLUMN "status",
ADD COLUMN     "status" "InvitationStatus" NOT NULL;
