import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

export function ScriptResults() {
  const testResults = [
    { name: "Login page loads correctly", status: "passed", duration: "0.8s" },
    { name: "Username field accepts input", status: "passed", duration: "0.3s" },
    { name: "Password field accepts input", status: "passed", duration: "0.2s" },
    { name: "Login button submits form", status: "passed", duration: "0.4s" },
    { name: "Error message shown for invalid credentials", status: "failed", duration: "1.2s" },
    { name: "Redirect to dashboard after login", status: "passed", duration: "0.9s" },
    { name: "User profile information is displayed", status: "warning", duration: "1.5s" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  const passedTests = testResults.filter((test) => test.status === "passed").length
  const totalTests = testResults.length
  const passRate = Math.round((passedTests / totalTests) * 100)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Test Results</CardTitle>
        <Badge variant="outline">Last run: 2 hours ago</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Pass Rate</div>
            <div className="text-sm font-medium">{passRate}%</div>
          </div>
          <Progress value={passRate} className="h-2" />
        </div>

        <div className="rounded-md border">
          <div className="grid grid-cols-12 border-b px-4 py-2 text-xs font-medium text-muted-foreground">
            <div className="col-span-6">Test Name</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-3 text-right">Duration</div>
          </div>
          <div className="divide-y">
            {testResults.map((test, index) => (
              <div key={index} className="grid grid-cols-12 px-4 py-3 text-sm">
                <div className="col-span-6">{test.name}</div>
                <div className="col-span-3 flex items-center">
                  {getStatusIcon(test.status)}
                  <span className="ml-2 capitalize">{test.status}</span>
                </div>
                <div className="col-span-3 text-right font-mono">{test.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
