"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileText, RefreshCw, Wand2 } from "lucide-react"

export function TestCaseGenerator() {
  const [loading, setLoading] = useState(false)

  const handleGenerate = () => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Test Case Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="feature">Feature/Module</Label>
          <Input id="feature" placeholder="e.g., Login, Registration, Checkout" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="test-type">Test Type</Label>
          <Select defaultValue="functional">
            <SelectTrigger>
              <SelectValue placeholder="Select test type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="functional">Functional</SelectItem>
              <SelectItem value="ui">UI/UX</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="accessibility">Accessibility</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe the feature or functionality to test" rows={4} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements/Acceptance Criteria</Label>
          <Textarea id="requirements" placeholder="List the requirements or acceptance criteria" rows={4} />
        </div>

        <div className="pt-2 space-y-2">
          <Button className="w-full" onClick={handleGenerate} disabled={loading}>
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Test Cases
              </>
            )}
          </Button>
          <Button variant="outline" className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            Import from Requirements
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
