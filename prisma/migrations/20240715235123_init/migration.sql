/*
  Warnings:

  - You are about to drop the column `filledFields` on the `userOrganizations` table. All the data in the column will be lost.
  - Added the required column `registrationData` to the `userOrganizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userOrganizations" DROP COLUMN "filledFields",
ADD COLUMN     "registrationData" JSONB NOT NULL,
ALTER COLUMN "permissions" DROP NOT NULL;
