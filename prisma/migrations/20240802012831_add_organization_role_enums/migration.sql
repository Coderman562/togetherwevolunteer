/*
  Warnings:

  - Changed the type of `role` on the `userOrganizations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'volunteer');

-- AlterTable
ALTER TABLE "userOrganizations" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;
