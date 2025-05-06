"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accessibility,
  AlertTriangle,
  CheckCircle2,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Mail,
  Search,
  Sparkles,
  XCircle,
} from "lucide-react"

export default function AccessibilityTestingPanel() {
  const [url, setUrl] = useState("")
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<null | {
    issues: Array<{
      severity: string
      type: string
      description: string
      element: string
      wcag: string
    }>
    score: number
    passedTests: number
    totalTests: number
  }>(null)

  const startScan = () => {
    if (!url) return

    setIsScanning(true)
    setScanProgress(0)
    setScanResults(null)

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          // Mock results
          setScanResults({
            issues: [
              {
                severity: "critical",
                type: "Contrast",
                description: "Text has insufficient contrast against background",
                element: "button.nav-link",
                wcag: "1.4.3 (AA)",
              },
              {
                severity: "serious",
                type: "Keyboard",
                description: "Interactive element is not keyboard accessible",
                element: "div.dropdown",
                wcag: "2.1.1 (A)",
              },
              {
                severity: "moderate",
                type: "ARIA",
                description: "ARIA attribute is invalid",
                element: "div[role='button']",
                wcag: "4.1.2 (A)",
              },
              {
                severity: "minor",
                type: "Alt Text",
                description: "Image is missing alt text",
                element: "img.hero-image",
                wcag: "1.1.1 (A)",
              },
              {
                severity: "critical",
                type: "Structure",
                description: "Heading levels should only increase by one",
                element: "h4",
                wcag: "1.3.1 (A)",
              },
            ],
            score: 72,
            passedTests: 18,
            totalTests: 25,
          })
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return <Badge className="bg-red-500 hover:bg-red-600">Critical</Badge>
      case "serious":
        return <Badge className="bg-orange-500 hover:bg-orange-600">Serious</Badge>
      case "moderate":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Moderate</Badge>
      case "minor":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Minor</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-purple-500 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Accessibility className="mr-2 h-5 w-5" />
            Accessibility Testing
          </CardTitle>
          <CardDescription>Test your website for WCAG compliance and accessibility issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="accessibility-url">Website URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="accessibility-url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={startScan} disabled={isScanning || !url} className="bg-purple-600 hover:bg-purple-700">
                  {isScanning ? "Scanning..." : "Scan"}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="wcag" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-purple-100/50 p-1 rounded-xl">
                <TabsTrigger value="wcag">WCAG Guidelines</TabsTrigger>
                <TabsTrigger value="automated">Automated Tests</TabsTrigger>
                <TabsTrigger value="manual">Manual Checklist</TabsTrigger>
              </TabsList>

              <TabsContent value="wcag" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>WCAG Compliance Level</Label>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <Button variant="outline" className="justify-start border-purple-200 bg-purple-100">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-purple-700" />
                      WCAG 2.1 Level A
                    </Button>
                    <Button variant="outline" className="justify-start border-purple-200 bg-purple-100">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-purple-700" />
                      WCAG 2.1 Level AA
                    </Button>
                    <Button variant="outline" className="justify-start border-purple-200">
                      <XCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                      WCAG 2.1 Level AAA
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Accessibility Categories</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    <Button variant="outline" className="justify-start border-purple-200">
                      Perceivable
                    </Button>
                    <Button variant="outline" className="justify-start border-purple-200">
                      Operable
                    </Button>
                    <Button variant="outline" className="justify-start border-purple-200">
                      Understandable
                    </Button>
                    <Button variant="outline" className="justify-start border-purple-200">
                      Robust
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="automated" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Automated Test Options</Label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="contrast" defaultChecked />
                      <label htmlFor="contrast" className="text-sm">
                        Color Contrast
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="alt-text" defaultChecked />
                      <label htmlFor="alt-text" className="text-sm">
                        Alt Text
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="keyboard" defaultChecked />
                      <label htmlFor="keyboard" className="text-sm">
                        Keyboard Navigation
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="aria" defaultChecked />
                      <label htmlFor="aria" className="text-sm">
                        ARIA Attributes
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="headings" defaultChecked />
                      <label htmlFor="headings" className="text-sm">
                        Heading Structure
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="forms" defaultChecked />
                      <label htmlFor="forms" className="text-sm">
                        Form Accessibility
                      </label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="manual" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Manual Testing Checklist</Label>
                  <Card className="border-purple-100">
                    <ScrollArea className="h-[300px]">
                      <div className="p-4 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="manual-keyboard" />
                            <label htmlFor="manual-keyboard" className="font-medium">
                              Keyboard Navigation
                            </label>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Verify all interactive elements can be accessed and operated using only a keyboard
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="manual-screen-reader" />
                            <label htmlFor="manual-screen-reader" className="font-medium">
                              Screen Reader Testing
                            </label>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Test with screen readers like NVDA, JAWS, or VoiceOver to ensure content is properly
                            announced
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="manual-zoom" />
                            <label htmlFor="manual-zoom" className="font-medium">
                              Text Zoom
                            </label>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Verify content remains usable when zoomed to 200%
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="manual-color" />
                            <label htmlFor="manual-color" className="font-medium">
                              Color Dependence
                            </label>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Check that information is not conveyed by color alone
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="manual-motion" />
                            <label htmlFor="manual-motion" className="font-medium">
                              Motion & Animation
                            </label>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Ensure animations can be paused and don't cause seizures
                          </p>
                        </div>
                      </div>
                    </ScrollArea>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="border-purple-200">
            <Sparkles className="mr-2 h-4 w-4" />
            Auto-Fix Issues
          </Button>
          <div className="space-x-2">
            <Button variant="outline" className="border-purple-200">
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" className="border-purple-200">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Excel
            </Button>
            <Button variant="outline" className="border-purple-200">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>
        </CardFooter>
      </Card>

      {(isScanning || scanResults) && (
        <Card className="border-t-4 border-t-purple-500 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="text-purple-700">Accessibility Results</CardTitle>
            {isScanning ? (
              <CardDescription>Scanning in progress...</CardDescription>
            ) : (
              <CardDescription>Accessibility scan completed for {url}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="p-6">
            {isScanning ? (
              <div className="space-y-4">
                <Progress value={scanProgress} className="h-2 w-full" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Accessibility className="mr-2 h-4 w-4 animate-pulse" />
                    Analyzing accessibility issues
                  </span>
                  <span className="font-medium">{scanProgress}%</span>
                </div>
              </div>
            ) : (
              scanResults && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="text-3xl font-bold text-purple-700">{scanResults.score}/100</div>
                      <p className="text-sm text-muted-foreground">Accessibility Score</p>
                    </div>
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-purple-500 bg-gradient-to-br from-purple-50 to-white shadow-lg">
                      {scanResults.score > 80 ? (
                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                      ) : scanResults.score > 60 ? (
                        <AlertTriangle className="h-12 w-12 text-amber-500" />
                      ) : (
                        <XCircle className="h-12 w-12 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-purple-700">Test Summary</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <Card className="bg-green-50 border-green-100">
                        <CardContent className="p-4">
                          <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-green-700">{scanResults.passedTests}</div>
                          <p className="text-sm text-green-700">Passed Tests</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-red-50 border-red-100">
                        <CardContent className="p-4">
                          <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-red-700">
                            {scanResults.totalTests - scanResults.passedTests}
                          </div>
                          <p className="text-sm text-red-700">Failed Tests</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-purple-50 border-purple-100">
                        <CardContent className="p-4">
                          <Eye className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-purple-700">{scanResults.totalTests}</div>
                          <p className="text-sm text-purple-700">Total Tests</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-700 mb-3">Detected Issues</h3>
                    <Card className="border-purple-100">
                      <ScrollArea className="h-[400px]">
                        <Table>
                          <TableHeader className="bg-purple-50 sticky top-0">
                            <TableRow>
                              <TableHead className="w-[100px]">Severity</TableHead>
                              <TableHead className="w-[120px]">Type</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead className="w-[150px]">Element</TableHead>
                              <TableHead className="w-[100px]">WCAG</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {scanResults.issues.map((issue, i) => (
                              <TableRow key={i} className="hover:bg-purple-50/50">
                                <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                                <TableCell>{issue.type}</TableCell>
                                <TableCell>{issue.description}</TableCell>
                                <TableCell className="font-mono text-xs">{issue.element}</TableCell>
                                <TableCell>{issue.wcag}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </Card>
                  </div>
                </div>
              )
            )}
          </CardContent>
          {!isScanning && scanResults && (
            <CardFooter className="bg-purple-50/50 border-t flex justify-between py-4">
              <Button variant="outline" className="border-purple-200">
                <Search className="mr-2 h-4 w-4" />
                View Details
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  )
}
