"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DashboardHeader() {
  const [isExporting, setIsExporting] = useState(false)
  const [newTestName, setNewTestName] = useState("")
  const [newTestType, setNewTestType] = useState("ui")

  const handleExportReports = () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)

      // Create a sample report content
      const reportContent = `# Testing Admin Panel Report
Generated: ${new Date().toLocaleString()}

## Summary
- Total Tests: 142
- Passed Tests: 118
- Failed Tests: 24
- Success Rate: 83%

## Recent Activity
1. Alex Johnson created UI test "Homepage Responsive Test" - Completed
2. Sarah Miller found defect "Login Form Validation" - Critical
3. David Chen ran security scan "User API Endpoints" - Completed
4. Emma Wilson created automation script "Product Checkout Flow" - In Progress
5. Michael Brown analyzed audio "Product Video Narration" - Completed

## Recommendations
- Update SSL certificate to use stronger encryption
- Implement Content Security Policy headers
- Fix critical XSS vulnerability in search form
- Secure cookies with HttpOnly and Secure flags
      `

      // Create a blob and download it
      const blob = new Blob([reportContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "testing-report.txt"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Reports exported",
        description: "Your testing reports have been downloaded",
      })
    }, 2000)
  }

  const handleCreateNewTest = () => {
    if (!newTestName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a test name",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Test created",
      description: `New ${getTestTypeLabel(newTestType)} test "${newTestName}" has been created`,
    })

    setNewTestName("")
  }

  const getTestTypeLabel = (type: string) => {
    switch (type) {
      case "ui":
        return "UI Responsive"
      case "security":
        return "Security"
      case "automation":
        return "Automation"
      case "audio":
        return "Audio Analysis"
      default:
        return type
    }
  }

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your testing admin panel</p>
      </div>
      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="button-hover-effect">New Test</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Test</DialogTitle>
              <DialogDescription>Set up a new test to run in your testing environment.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newTestName}
                  onChange={(e) => setNewTestName(e.target.value)}
                  placeholder="Enter test name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test-type" className="text-right">
                  Type
                </Label>
                <Select value={newTestType} onValueChange={setNewTestType}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ui">UI Responsive Test</SelectItem>
                    <SelectItem value="security">Security Test</SelectItem>
                    <SelectItem value="automation">Automation Script</SelectItem>
                    <SelectItem value="audio">Audio Analysis</SelectItem>
                    <SelectItem value="video">Video Playback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateNewTest}>
                Create Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="outline" onClick={handleExportReports} disabled={isExporting}>
          {isExporting ? "Exporting..." : "Export Reports"}
        </Button>
      </div>
    </div>
  )
}
