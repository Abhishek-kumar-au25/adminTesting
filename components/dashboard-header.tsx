import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your Testing panel</p>
      </div>
      <div className="flex items-center gap-2">
        <Button>New Test</Button>
        <Button variant="outline">Export Reports</Button>
      </div>
    </div>
  )
}
