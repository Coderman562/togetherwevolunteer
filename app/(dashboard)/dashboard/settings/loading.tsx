import { Card } from "@/components/ui/card"
import { DashboardHeader } from "@/components/navigation/header"
import { DashboardShell } from "@/components/shell"
import { CardSkeleton } from "@/components/skeleton-loaders/card-skeleton"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
