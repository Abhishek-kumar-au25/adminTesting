"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Edit, Trash2, Copy, Filter } from "lucide-react"

export function TestCaseList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const testCases = [
    {
      id: "TC001",
      title: "Verify user login with valid credentials",
      priority: "high",
      status: "active",
      type: "functional",
    },
    {
      id: "TC002",
      title: "Verify user login with invalid credentials",
      priority: "high",
      status: "active",
      type: "functional",
    },
    {
      id: "TC003",
      title: "Verify password reset functionality",
      priority: "medium",
      status: "active",
      type: "functional",
    },
    {
      id: "TC004",
      title: "Verify user registration with valid data",
      priority: "high",
      status: "active",
      type: "functional",
    },
    {
      id: "TC005",
      title: "Verify form validation for required fields",
      priority: "medium",
      status: "active",
      type: "ui",
    },
    {
      id: "TC006",
      title: "Verify responsive design on mobile devices",
      priority: "medium",
      status: "active",
      type: "ui",
    },
    {
      id: "TC007",
      title: "Verify page load time under heavy traffic",
      priority: "low",
      status: "draft",
      type: "performance",
    },
  ]

  const filteredTestCases = testCases.filter(
    (testCase) =>
      testCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testCase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testCase.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredTestCases.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredTestCases.map((testCase) => testCase.id))
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Test Cases</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Test Case
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search test cases..."
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
                checked={selectedItems.length === filteredTestCases.length && filteredTestCases.length > 0}
                onCheckedChange={toggleSelectAll}
              />
            </div>
            <div className="col-span-2">ID</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-2">Actions</div>
          </div>
          <div className="divide-y">
            {filteredTestCases.map((testCase) => (
              <div key={testCase.id} className="grid grid-cols-12 items-center px-4 py-3 text-sm">
                <div className="col-span-1">
                  <Checkbox
                    checked={selectedItems.includes(testCase.id)}
                    onCheckedChange={() => toggleSelectItem(testCase.id)}
                  />
                </div>
                <div className="col-span-2 font-medium">{testCase.id}</div>
                <div className="col-span-5">{testCase.title}</div>
                <div className="col-span-2">{getPriorityBadge(testCase.priority)}</div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
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
