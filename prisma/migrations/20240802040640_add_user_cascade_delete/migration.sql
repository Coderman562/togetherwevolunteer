-- DropForeignKey
ALTER TABLE "userOrganizations" DROP CONSTRAINT "userOrganizations_userId_fkey";

-- AddForeignKey
ALTER TABLE "userOrganizations" ADD CONSTRAINT "userOrganizations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
