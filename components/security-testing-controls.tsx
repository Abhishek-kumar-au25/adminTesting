import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield, Lock, Key, FileWarning, Database, Cookie } from "lucide-react"

export function SecurityTestingControls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Tests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="xss-test" />
            <Label htmlFor="xss-test" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              XSS Vulnerability Test
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="ssl-test" defaultChecked />
            <Label htmlFor="ssl-test" className="flex items-center">
              <Lock className="mr-2 h-4 w-4" />
              SSL/TLS Configuration
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="api-test" defaultChecked />
            <Label htmlFor="api-test" className="flex items-center">
              <Key className="mr-2 h-4 w-4" />
              API Security Test
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="content-test" />
            <Label htmlFor="content-test" className="flex items-center">
              <FileWarning className="mr-2 h-4 w-4" />
              Content Security Policy
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="sql-test" defaultChecked />
            <Label htmlFor="sql-test" className="flex items-center">
              <Database className="mr-2 h-4 w-4" />
              SQL Injection Test
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="cookie-test" />
            <Label htmlFor="cookie-test" className="flex items-center">
              <Cookie className="mr-2 h-4 w-4" />
              Cookie Security
            </Label>
          </div>
        </div>

        <div className="pt-2 space-y-2">
          <Button className="w-full">Run Security Tests</Button>
          <Button variant="outline" className="w-full">
            Export Security Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
