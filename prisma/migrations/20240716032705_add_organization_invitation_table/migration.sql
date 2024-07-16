-- CreateTable
CREATE TABLE "organizationInvitations" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "adminWhoInvited" UUID NOT NULL,
    "invitedEmail" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "permissions" JSONB,
    "status" TEXT NOT NULL,
    "invitedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMPTZ(3),

    CONSTRAINT "organizationInvitations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organizationInvitations" ADD CONSTRAINT "organizationInvitations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationInvitations" ADD CONSTRAINT "organizationInvitations_adminWhoInvited_fkey" FOREIGN KEY ("adminWhoInvited") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
