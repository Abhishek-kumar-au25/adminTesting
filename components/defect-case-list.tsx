"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Edit, Filter, Eye } from "lucide-react"

export function DefectCaseList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const defects = [
    {
      id: "DEF001",
      title: "Login button not working on Safari browser",
      severity: "high",
      status: "open",
      assignee: "Alex Johnson",
    },
    {
      id: "DEF002",
      title: "Form validation error message not displayed",
      severity: "medium",
      status: "in-progress",
      assignee: "Sarah Miller",
    },
    {
      id: "DEF003",
      title: "Checkout process fails with specific payment method",
      severity: "critical",
      status: "open",
      assignee: "Unassigned",
    },
    {
      id: "DEF004",
      title: "Product images not loading on mobile devices",
      severity: "medium",
      status: "open",
      assignee: "David Chen",
    },
    {
      id: "DEF005",
      title: "Incorrect price calculation in shopping cart",
      severity: "high",
      status: "in-progress",
      assignee: "Emma Wilson",
    },
    {
      id: "DEF006",
      title: "Password reset email not being sent",
      severity: "high",
      status: "open",
      assignee: "Unassigned",
    },
    {
      id: "DEF007",
      title: "UI alignment issue on product details page",
      severity: "low",
      status: "open",
      assignee: "Michael Brown",
    },
  ]

  const filteredDefects = defects.filter(
    (defect) =>
      defect.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.assignee.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredDefects.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredDefects.map((defect) => defect.id))
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge>Open</Badge>
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Resolved
          </Badge>
        )
      case "closed":
        return <Badge variant="outline">Closed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Defect Cases</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Defect
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search defects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-md border">
          <div className="grid grid-cols-12 border-b px-4 py-2 text-xs font-medium text-muted-foreground">
            <div className="col-span-1">
              <Checkbox
                checked={selectedItems.length === filteredDefects.length && filteredDefects.length > 0}
                onCheckedChange={toggleSelectAll}
              />
            </div>
            <div className="col-span-2">ID</div>
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Severity</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Actions</div>
          </div>
          <div className="divide-y">
            {filteredDefects.map((defect) => (
              <div key={defect.id} className="grid grid-cols-12 items-center px-4 py-3 text-sm">
                <div className="col-span-1">
                  <Checkbox
                    checked={selectedItems.includes(defect.id)}
                    onCheckedChange={() => toggleSelectItem(defect.id)}
                  />
                </div>
                <div className="col-span-2 font-medium">{defect.id}</div>
                <div className="col-span-4">{defect.title}</div>
                <div className="col-span-2">{getSeverityBadge(defect.severity)}</div>
                <div className="col-span-2">{getStatusBadge(defect.status)}</div>
                <div className="col-span-1 flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
