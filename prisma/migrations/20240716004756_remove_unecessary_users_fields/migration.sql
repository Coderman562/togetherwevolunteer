/*
  Warnings:

  - You are about to drop the column `profilePicture` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCurrentPeriodEnd` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_stripeCustomerId_key";

-- DropIndex
DROP INDEX "users_stripeSubscriptionId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profilePicture",
DROP COLUMN "stripeCurrentPeriodEnd",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripePriceId",
DROP COLUMN "stripeSubscriptionId";
