import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, BarChart3, PieChart } from "lucide-react"

export function SecurityReport() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Security Report</CardTitle>
        <Badge variant="outline">Last scan: 2 hours ago</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Overall Security Score</div>
              <div className="text-sm font-medium">78/100</div>
            </div>
            <Progress value={78} className="h-2" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="text-2xl font-bold">3</div>
                  </div>
                  <div>
                    <Badge variant="destructive">1 Critical</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">Warnings</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="text-2xl font-bold">7</div>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
                      Medium
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">Passed Tests</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <PieChart className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="text-2xl font-bold">24</div>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Good
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Recommendations</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Update SSL certificate to use stronger encryption</li>
              <li>Implement Content Security Policy headers</li>
              <li>Fix critical XSS vulnerability in search form</li>
              <li>Secure cookies with HttpOnly and Secure flags</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
