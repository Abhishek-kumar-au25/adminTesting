"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, Search, Code, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export function AutomationScripts() {
  const [searchQuery, setSearchQuery] = useState("")

  const scripts = [
    {
      name: "Login Flow Test",
      status: "ready",
      lastRun: "2 hours ago",
      type: "UI",
    },
    {
      name: "Product Search",
      status: "running",
      lastRun: "Running...",
      type: "UI",
    },
    {
      name: "API Authentication",
      status: "ready",
      lastRun: "Yesterday",
      type: "API",
    },
    {
      name: "Form Validation",
      status: "failed",
      lastRun: "1 day ago",
      type: "UI",
    },
    {
      name: "Payment Process",
      status: "ready",
      lastRun: "3 days ago",
      type: "E2E",
    },
    {
      name: "User Registration",
      status: "ready",
      lastRun: "1 week ago",
      type: "UI",
    },
    {
      name: "Data Export",
      status: "ready",
      lastRun: "2 weeks ago",
      type: "API",
    },
  ]

  const filteredScripts = scripts.filter(
    (script) =>
      script.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getStatusBadge = (type: string) => {
    switch (type) {
      case "UI":
        return <Badge variant="outline">UI</Badge>
      case "API":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
            API
          </Badge>
        )
      case "E2E":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            E2E
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Automation Scripts</CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Script
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search scripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="space-y-2">
            {filteredScripts.map((script, index) => (
              <div key={index} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{script.name}</div>
                    <div className="text-xs text-muted-foreground">Last run: {script.lastRun}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(script.type)}
                  <div className="flex items-center space-x-1">{getStatusIcon(script.status)}</div>
                  <Button size="icon" variant="ghost">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
