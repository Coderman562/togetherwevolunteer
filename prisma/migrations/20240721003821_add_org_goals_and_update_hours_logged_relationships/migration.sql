/*
  Warnings:

  - You are about to drop the column `verifiedBy` on the `hoursLogged` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "documents" ALTER COLUMN "uploadedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "hoursLogged" DROP COLUMN "verifiedBy",
ADD COLUMN     "adminDeniedById" UUID,
ADD COLUMN     "adminVerifiedById" UUID,
ADD COLUMN     "reasonDenied" TEXT;

-- CreateTable
CREATE TABLE "organizationGoals" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "target" DECIMAL(65,30) NOT NULL,
    "currentProgress" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "startDate" TIMESTAMPTZ(3) NOT NULL,
    "endDate" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "organizationGoals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizationBadges" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "requiredHours" DECIMAL(65,30) NOT NULL,
    "image" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "organizationBadges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hoursLogged" ADD CONSTRAINT "hoursLogged_adminVerifiedById_fkey" FOREIGN KEY ("adminVerifiedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoursLogged" ADD CONSTRAINT "hoursLogged_adminDeniedById_fkey" FOREIGN KEY ("adminDeniedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationGoals" ADD CONSTRAINT "organizationGoals_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationBadges" ADD CONSTRAINT "organizationBadges_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
