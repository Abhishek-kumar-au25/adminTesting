"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileText,
  Mail,
  Plus,
  Trash2,
  Edit,
  Copy,
  FileSpreadsheet,
  FileIcon as FilePdf,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react"

export default function TestCasePanel() {
  const [activeTab, setActiveTab] = useState("test-cases")
  const [testCases, setTestCases] = useState([
    {
      id: 1,
      name: "Login Functionality",
      description: "Verify user can login with valid credentials",
      steps: "1. Navigate to login page\n2. Enter valid username\n3. Enter valid password\n4. Click login button",
      expectedResult: "User should be logged in and redirected to dashboard",
      status: "Passed",
    },
    {
      id: 2,
      name: "Password Reset",
      description: "Verify password reset functionality works",
      steps: "1. Navigate to login page\n2. Click 'Forgot Password'\n3. Enter email address\n4. Click submit",
      expectedResult: "Password reset email should be sent to user",
      status: "Failed",
    },
    {
      id: 3,
      name: "User Registration",
      description: "Verify new user registration process",
      steps: "1. Navigate to registration page\n2. Fill all required fields\n3. Accept terms\n4. Click register",
      expectedResult: "User account should be created and verification email sent",
      status: "Pending",
    },
  ])

  const [defects, setDefects] = useState([
    {
      id: 1,
      name: "Login button unresponsive",
      description: "Login button doesn't respond on first click",
      severity: "High",
      steps: "1. Navigate to login page\n2. Enter credentials\n3. Click login button once",
      expectedResult: "User should be logged in",
      actualResult: "Button animation occurs but no login action is triggered",
      status: "Open",
    },
    {
      id: 2,
      name: "Form validation error",
      description: "Email validation accepts invalid formats",
      severity: "Medium",
      steps: "1. Go to registration form\n2. Enter 'test' as email\n3. Submit form",
      expectedResult: "Form should show validation error",
      actualResult: "Form accepts invalid email format",
      status: "In Progress",
    },
  ])

  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [targetUrl, setTargetUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateTestCases = () => {
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      setShowGenerateDialog(false)

      // Add generated test cases
      const newTestCases = [
        ...testCases,
        {
          id: testCases.length + 1,
          name: "Homepage Navigation",
          description: `Auto-generated test for ${targetUrl}`,
          steps: "1. Navigate to homepage\n2. Verify all navigation links\n3. Click on each main navigation item",
          expectedResult: "All navigation links should work correctly",
          status: "Pending",
        },
        {
          id: testCases.length + 2,
          name: "Mobile Responsiveness",
          description: `Auto-generated test for ${targetUrl}`,
          steps: "1. Open site on mobile viewport\n2. Check all elements resize properly\n3. Test navigation menu",
          expectedResult: "Site should be fully functional on mobile devices",
          status: "Pending",
        },
      ]

      setTestCases(newTestCases)
    }, 2000)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "passed":
        return <Badge className="bg-green-500 hover:bg-green-600">Passed</Badge>
      case "failed":
        return <Badge className="bg-red-500 hover:bg-red-600">Failed</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "open":
        return <Badge className="bg-red-500 hover:bg-red-600">Open</Badge>
      case "in progress":
        return <Badge className="bg-amber-500 hover:bg-amber-600">In Progress</Badge>
      case "closed":
        return <Badge className="bg-green-500 hover:bg-green-600">Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return <Badge className="bg-red-500 hover:bg-red-600">High</Badge>
      case "medium":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <FileText className="mr-2 h-5 w-5" />
            Test Case Management
          </CardTitle>
          <CardDescription>Create, manage, and export test cases and defect reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="test-cases"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
              >
                Test Cases
              </TabsTrigger>
              <TabsTrigger
                value="defects"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
              >
                Defect Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="test-cases" className="space-y-4">
              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Test Case
                  </Button>

                  <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-purple-200 text-purple-700">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Auto-Generate
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Generate Test Cases</DialogTitle>
                        <DialogDescription>
                          Our AI will analyze the website and generate test cases automatically.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="target-url">Website URL</Label>
                          <Input
                            id="target-url"
                            placeholder="https://example.com"
                            value={targetUrl}
                            onChange={(e) => setTargetUrl(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Test Types</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="functional" defaultChecked />
                              <label htmlFor="functional" className="text-sm">
                                Functional
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="ui" defaultChecked />
                              <label htmlFor="ui" className="text-sm">
                                UI/UX
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="responsive" defaultChecked />
                              <label htmlFor="responsive" className="text-sm">
                                Responsive
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="performance" />
                              <label htmlFor="performance" className="text-sm">
                                Performance
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowGenerateDialog(false)}>
                          Cancel
                        </Button>
                        <Button
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={handleGenerateTestCases}
                          disabled={!targetUrl || isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Generate
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-x-2">
                  <Button variant="outline" className="border-purple-200">
                    <FilePdf className="mr-2 h-4 w-4" />
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
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-purple-50">
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testCases.map((testCase) => (
                      <TableRow key={testCase.id}>
                        <TableCell className="font-medium">{testCase.id}</TableCell>
                        <TableCell>{testCase.name}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                          {testCase.description}
                        </TableCell>
                        <TableCell>{getStatusBadge(testCase.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-700">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-700">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="defects" className="space-y-4">
              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Defect
                  </Button>
                  <Button variant="outline" className="border-purple-200 text-purple-700">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Auto-Detect
                  </Button>
                </div>

                <div className="space-x-2">
                  <Button variant="outline" className="border-purple-200">
                    <FilePdf className="mr-2 h-4 w-4" />
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
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-purple-50">
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Defect</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {defects.map((defect) => (
                      <TableRow key={defect.id}>
                        <TableCell className="font-medium">{defect.id}</TableCell>
                        <TableCell>{defect.name}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                          {defect.description}
                        </TableCell>
                        <TableCell>{getSeverityBadge(defect.severity)}</TableCell>
                        <TableCell>{getStatusBadge(defect.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-700">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-700">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <FileText className="mr-2 h-5 w-5" />
            Test Case Templates
          </CardTitle>
          <CardDescription>Predefined templates for common testing scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-purple-700">Functional Testing</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">Basic template for testing core functionality</p>
                <div className="mt-4 flex justify-between">
                  <Badge variant="outline" className="bg-purple-50">
                    10 test cases
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 text-purple-700">
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-purple-700">UI/UX Testing</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">Comprehensive UI and user experience tests</p>
                <div className="mt-4 flex justify-between">
                  <Badge variant="outline" className="bg-purple-50">
                    15 test cases
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 text-purple-700">
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-purple-700">Performance Testing</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">Load, stress, and performance test cases</p>
                <div className="mt-4 flex justify-between">
                  <Badge variant="outline" className="bg-purple-50">
                    8 test cases
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 text-purple-700">
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full border-purple-200 text-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Custom Template
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-t-4 border-t-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Testing Progress
          </CardTitle>
          <CardDescription>Overview of your testing progress and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Passed Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">12</div>
                <p className="text-sm text-muted-foreground">+3 since last week</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                  Failed Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">5</div>
                <p className="text-sm text-muted-foreground">-2 since last week</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                  Open Defects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-500">8</div>
                <p className="text-sm text-muted-foreground">+1 since last week</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
