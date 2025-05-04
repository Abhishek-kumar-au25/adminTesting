import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Bug, CheckCircle, Clock } from "lucide-react"

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="card-hover-effect animate-slide-in" style={{ animationDelay: "0ms" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
          <Activity className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">142</div>
          <p className="text-xs text-muted-foreground">+22% from last month</p>
        </CardContent>
      </Card>
      <Card className="card-hover-effect animate-slide-in" style={{ animationDelay: "50ms" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Passed Tests</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">118</div>
          <p className="text-xs text-muted-foreground">83% success rate</p>
        </CardContent>
      </Card>
      <Card className="card-hover-effect animate-slide-in" style={{ animationDelay: "100ms" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Defects Found</CardTitle>
          <Bug className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">12 critical, 12 minor</p>
        </CardContent>
      </Card>
      <Card className="card-hover-effect animate-slide-in" style={{ animationDelay: "150ms" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Test Time</CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.2m</div>
          <p className="text-xs text-muted-foreground">-12% from last week</p>
        </CardContent>
      </Card>
    </div>
  )
}
