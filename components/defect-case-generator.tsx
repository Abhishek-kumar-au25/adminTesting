"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RefreshCw, Wand2, Upload } from "lucide-react"

export function DefectCaseGenerator() {
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
        <CardTitle>Defect Case Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="defect-title">Defect Title</Label>
          <Input id="defect-title" placeholder="Brief description of the defect" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="severity">Severity</Label>
          <Select defaultValue="medium">
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="defect-description">Description</Label>
          <Textarea id="defect-description" placeholder="Detailed description of the defect" rows={3} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="steps">Steps to Reproduce</Label>
          <Textarea
            id="steps"
            placeholder="1. Go to login page
2. Enter invalid credentials
3. Click login button"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expected">Expected Result</Label>
          <Textarea id="expected" placeholder="What should happen" rows={2} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="actual">Actual Result</Label>
          <Textarea id="actual" placeholder="What actually happens" rows={2} />
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
                Generate Defect Template
              </>
            )}
          </Button>
          <Button variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Attach Screenshot
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
