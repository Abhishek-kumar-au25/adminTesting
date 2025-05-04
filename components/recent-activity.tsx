import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      user: "Alex Johnson",
      action: "Created UI test",
      target: "Homepage Responsive Test",
      time: "2 hours ago",
      status: "completed",
    },
    {
      user: "Sarah Miller",
      action: "Found defect",
      target: "Login Form Validation",
      time: "3 hours ago",
      status: "critical",
    },
    {
      user: "David Chen",
      action: "Ran security scan",
      target: "User API Endpoints",
      time: "5 hours ago",
      status: "completed",
    },
    {
      user: "Emma Wilson",
      action: "Created automation script",
      target: "Product Checkout Flow",
      time: "Yesterday",
      status: "in-progress",
    },
    {
      user: "Michael Brown",
      action: "Analyzed audio",
      target: "Product Video Narration",
      time: "Yesterday",
      status: "completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest testing activities across your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action} - {activity.target}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    activity.status === "critical"
                      ? "destructive"
                      : activity.status === "in-progress"
                        ? "outline"
                        : "default"
                  }
                >
                  {activity.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
