import { DashboardHeader } from "@/components/navigation/header"
import { DashboardShell } from "@/components/shell"
import { CardSkeleton } from "@/components/skeleton-loaders/card-skeleton"

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
