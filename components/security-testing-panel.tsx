"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Scan,
  Search,
  Filter,
  Download,
  Globe,
  Clock,
  FileType,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react"

type NetworkRequest = {
  id: number
  url: string
  method: string
  status: number
  type: string
  size: string
  time: string
  initiator: string
}

export default function SecurityTestingPanel() {
  const [url, setUrl] = useState("")
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<null | {
    vulnerabilities: Array<{ severity: string; name: string; description: string }>
    score: number
  }>(null)

  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<NetworkRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof NetworkRequest
    direction: "ascending" | "descending"
  } | null>(null)

  // Mock network requests data
  useEffect(() => {
    const mockRequests: NetworkRequest[] = [
      {
        id: 1,
        url: "https://example.com/api/users",
        method: "GET",
        status: 200,
        type: "fetch",
        size: "1.2 KB",
        time: "120 ms",
        initiator: "script",
      },
      {
        id: 2,
        url: "https://example.com/api/products",
        method: "GET",
        status: 200,
        type: "xhr",
        size: "4.5 KB",
        time: "230 ms",
        initiator: "script",
      },
      {
        id: 3,
        url: "https://example.com/styles/main.css",
        method: "GET",
        status: 200,
        type: "stylesheet",
        size: "8.7 KB",
        time: "45 ms",
        initiator: "parser",
      },
      {
        id: 4,
        url: "https://example.com/js/analytics.js",
        method: "GET",
        status: 200,
        type: "script",
        size: "32.1 KB",
        time: "78 ms",
        initiator: "parser",
      },
      {
        id: 5,
        url: "https://cdn.thirdparty.com/tracking.js",
        method: "GET",
        status: 200,
        type: "script",
        size: "15.3 KB",
        time: "190 ms",
        initiator: "script",
      },
      {
        id: 6,
        url: "https://example.com/api/auth",
        method: "POST",
        status: 401,
        type: "fetch",
        size: "0.8 KB",
        time: "350 ms",
        initiator: "script",
      },
      {
        id: 7,
        url: "https://example.com/images/hero.webp",
        method: "GET",
        status: 200,
        type: "image",
        size: "245.2 KB",
        time: "320 ms",
        initiator: "img",
      },
      {
        id: 8,
        url: "https://example.com/api/comments",
        method: "GET",
        status: 404,
        type: "fetch",
        size: "0.5 KB",
        time: "180 ms",
        initiator: "script",
      },
      {
        id: 9,
        url: "https://fonts.googleapis.com/css",
        method: "GET",
        status: 200,
        type: "font",
        size: "2.3 KB",
        time: "65 ms",
        initiator: "css",
      },
      {
        id: 10,
        url: "https://example.com/api/metrics",
        method: "POST",
        status: 204,
        type: "beacon",
        size: "1.1 KB",
        time: "40 ms",
        initiator: "script",
      },
      {
        id: 11,
        url: "https://ads.doubleclick.net/pixel",
        method: "GET",
        status: 200,
        type: "image",
        size: "0.3 KB",
        time: "150 ms",
        initiator: "script",
      },
      {
        id: 12,
        url: "https://example.com/favicon.ico",
        method: "GET",
        status: 200,
        type: "image",
        size: "4.2 KB",
        time: "30 ms",
        initiator: "parser",
      },
      {
        id: 13,
        url: "https://api.mapbox.com/tiles",
        method: "GET",
        status: 200,
        type: "xhr",
        size: "18.7 KB",
        time: "210 ms",
        initiator: "script",
      },
      {
        id: 14,
        url: "https://example.com/api/settings",
        method: "GET",
        status: 403,
        type: "fetch",
        size: "0.6 KB",
        time: "95 ms",
        initiator: "script",
      },
      {
        id: 15,
        url: "https://example.com/media/video.mp4",
        method: "GET",
        status: 206,
        type: "media",
        size: "1.2 MB",
        time: "450 ms",
        initiator: "video",
      },
    ]

    setNetworkRequests(mockRequests)
    setFilteredRequests(mockRequests)
  }, [])

  // Filter and search network requests
  useEffect(() => {
    let results = networkRequests

    // Apply search
    if (searchTerm) {
      results = results.filter(
        (request) =>
          request.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.initiator.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply type filter
    if (filterType !== "all") {
      results = results.filter((request) => request.type === filterType)
    }

    // Apply sorting
    if (sortConfig) {
      results = [...results].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredRequests(results)
  }, [networkRequests, searchTerm, filterType, sortConfig])

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
            vulnerabilities: [
              {
                severity: "high",
                name: "Cross-Site Scripting (XSS)",
                description: "Detected potential XSS vulnerability in form submission",
              },
              {
                severity: "medium",
                name: "Missing HTTP Security Headers",
                description: "Content-Security-Policy header not set",
              },
              {
                severity: "low",
                name: "Insecure Cookie",
                description: "Cookies set without secure flag",
              },
              {
                severity: "medium",
                name: "Mixed Content",
                description: "Secure page includes resources via unencrypted HTTP",
              },
              {
                severity: "high",
                name: "Outdated Libraries",
                description: "Using jQuery v1.8.3 with known vulnerabilities",
              },
            ],
            score: 68,
          })
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const requestSort = (key: keyof NetworkRequest) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof NetworkRequest) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 opacity-30" />
    }
    return sortConfig.direction === "ascending" ? (
      <ArrowUpDown className="h-4 w-4 text-purple-500" />
    ) : (
      <ArrowUpDown className="h-4 w-4 text-purple-500 rotate-180" />
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-purple-500 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <ShieldAlert className="mr-2 h-5 w-5" />
            Security Testing
          </CardTitle>
          <CardDescription>Scan websites and applications for security vulnerabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="security-url">Target URL or IP</Label>
              <div className="flex space-x-2">
                <Input
                  id="security-url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={startScan} disabled={isScanning || !url} className="bg-purple-600 hover:bg-purple-700">
                  <Scan className="mr-2 h-4 w-4" />
                  Scan
                </Button>
              </div>
            </div>

            <Tabs defaultValue="vulnerability" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-purple-100/50 p-1 rounded-xl">
                <TabsTrigger value="vulnerability">Vulnerability Scan</TabsTrigger>
                <TabsTrigger value="network">Network Monitor</TabsTrigger>
                <TabsTrigger value="compliance">Compliance Check</TabsTrigger>
              </TabsList>

              <TabsContent value="vulnerability" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Scan Options</Label>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    <Button variant="outline" className="justify-start border-purple-200">
                      <ShieldAlert className="mr-2 h-4 w-4 text-red-500" />
                      XSS Detection
                    </Button>
                    <Button variant="outline" className="justify-start border-purple-200">
                      <Lock className="mr-2 h-4 w-4 text-amber-500" />
                      SQL Injection
                    </Button>
                    <Button variant="outline" className="justify-start border-purple-200">
                      <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
                      CSRF Testing
                    </Button>
                    <Button variant="outline" className="justify-start border-purple-200">
                      <Globe className="mr-2 h-4 w-4 text-blue-500" />
                      Open Ports
                    </Button>
                    <Button variant="outline" className="justify-start border-purple-200">
                      <FileType className="mr-2 h-4 w-4 text-green-500" />
                      File Inclusion
                    </Button>
                    <Button variant="outline" className="justify-start border-purple-200">
                      <Eye className="mr-2 h-4 w-4 text-purple-500" />
                      Information Disclosure
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="network" className="space-y-4 pt-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:justify-between">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search URLs, methods, types..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-[180px]">
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="h-72">
                            <div className="p-1">
                              <Button
                                variant="ghost"
                                className="w-full justify-start mb-1"
                                onClick={() => setFilterType("all")}
                              >
                                All Types
                              </Button>
                              {Array.from(new Set(networkRequests.map((req) => req.type))).map((type) => (
                                <Button
                                  key={type}
                                  variant="ghost"
                                  className="w-full justify-start mb-1"
                                  onClick={() => setFilterType(type)}
                                >
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </Button>
                              ))}
                            </div>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        className="border-purple-200"
                        onClick={() => {
                          setSearchTerm("")
                          setFilterType("all")
                          setSortConfig(null)
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Card className="border-purple-100">
                    <ScrollArea className="h-[400px] w-full rounded-md border">
                      <Table>
                        <TableHeader className="bg-purple-50 sticky top-0">
                          <TableRow>
                            <TableHead className="w-[40px]">#</TableHead>
                            <TableHead
                              className="w-[300px] cursor-pointer hover:bg-purple-100/50"
                              onClick={() => requestSort("url")}
                            >
                              <div className="flex items-center">URL {getSortIcon("url")}</div>
                            </TableHead>
                            <TableHead
                              className="w-[80px] cursor-pointer hover:bg-purple-100/50"
                              onClick={() => requestSort("method")}
                            >
                              <div className="flex items-center">Method {getSortIcon("method")}</div>
                            </TableHead>
                            <TableHead
                              className="w-[80px] cursor-pointer hover:bg-purple-100/50"
                              onClick={() => requestSort("status")}
                            >
                              <div className="flex items-center">Status {getSortIcon("status")}</div>
                            </TableHead>
                            <TableHead
                              className="w-[100px] cursor-pointer hover:bg-purple-100/50"
                              onClick={() => requestSort("type")}
                            >
                              <div className="flex items-center">Type {getSortIcon("type")}</div>
                            </TableHead>
                            <TableHead
                              className="w-[80px] cursor-pointer hover:bg-purple-100/50"
                              onClick={() => requestSort("size")}
                            >
                              <div className="flex items-center">Size {getSortIcon("size")}</div>
                            </TableHead>
                            <TableHead
                              className="w-[80px] cursor-pointer hover:bg-purple-100/50"
                              onClick={() => requestSort("time")}
                            >
                              <div className="flex items-center">Time {getSortIcon("time")}</div>
                            </TableHead>
                            <TableHead className="w-[100px]">Initiator</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRequests.length > 0 ? (
                            filteredRequests.map((request) => (
                              <TableRow key={request.id} className="hover:bg-purple-50/50">
                                <TableCell className="font-medium">{request.id}</TableCell>
                                <TableCell className="font-mono text-xs truncate max-w-[300px]" title={request.url}>
                                  {request.url}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      request.method === "GET"
                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                        : request.method === "POST"
                                          ? "bg-green-50 text-green-700 border-green-200"
                                          : request.method === "PUT"
                                            ? "bg-amber-50 text-amber-700 border-amber-200"
                                            : request.method === "DELETE"
                                              ? "bg-red-50 text-red-700 border-red-200"
                                              : "bg-gray-50 text-gray-700 border-gray-200"
                                    }
                                  >
                                    {request.method}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      request.status >= 200 && request.status < 300
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : request.status >= 300 && request.status < 400
                                          ? "bg-blue-50 text-blue-700 border-blue-200"
                                          : request.status >= 400 && request.status < 500
                                            ? "bg-amber-50 text-amber-700 border-amber-200"
                                            : request.status >= 500
                                              ? "bg-red-50 text-red-700 border-red-200"
                                              : "bg-gray-50 text-gray-700 border-gray-200"
                                    }
                                  >
                                    {request.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{request.type}</TableCell>
                                <TableCell>{request.size}</TableCell>
                                <TableCell>{request.time}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">{request.initiator}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={8} className="h-24 text-center">
                                No results found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                    <CardFooter className="bg-purple-50/50 border-t py-2 px-4 text-sm text-muted-foreground">
                      Showing {filteredRequests.length} of {networkRequests.length} requests
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Compliance Standards</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                      <Button variant="outline" className="justify-start border-purple-200">
                        GDPR
                      </Button>
                      <Button variant="outline" className="justify-start border-purple-200">
                        HIPAA
                      </Button>
                      <Button variant="outline" className="justify-start border-purple-200">
                        PCI DSS
                      </Button>
                      <Button variant="outline" className="justify-start border-purple-200">
                        ISO 27001
                      </Button>
                      <Button variant="outline" className="justify-start border-purple-200">
                        NIST
                      </Button>
                      <Button variant="outline" className="justify-start border-purple-200">
                        SOC 2
                      </Button>
                      <Button variant="outline" className="justify-start border-purple-200">
                        CCPA
                      </Button>
                      <Button variant="outline" className="justify-start border-purple-200">
                        OWASP Top 10
                      </Button>
                    </div>
                  </div>

                  <Card className="border-purple-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Compliance Report</CardTitle>
                      <CardDescription>Select a standard to generate a compliance report</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <ShieldCheck className="h-16 w-16 text-purple-200 mb-4" />
                        <p className="text-muted-foreground">
                          Select a compliance standard and run a scan to generate a report
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {(isScanning || scanResults) && (
        <Card className="border-t-4 border-t-purple-500 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="text-purple-700">Scan Results</CardTitle>
            {isScanning ? (
              <CardDescription>Scanning in progress...</CardDescription>
            ) : (
              <CardDescription>Security scan completed for {url}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="p-6">
            {isScanning ? (
              <div className="space-y-4">
                <Progress value={scanProgress} className="h-2 w-full" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Scan className="mr-2 h-4 w-4 animate-pulse" />
                    Analyzing security vulnerabilities
                  </span>
                  <span className="font-medium">{scanProgress}%</span>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Checking HTTP headers</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Analyzing SSL/TLS configuration</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-amber-500 animate-pulse" />
                    <span>Scanning for XSS vulnerabilities</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Testing for SQL injection</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Checking for outdated software</span>
                  </div>
                </div>
              </div>
            ) : (
              scanResults && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="text-3xl font-bold text-purple-700">{scanResults.score}/100</div>
                      <p className="text-sm text-muted-foreground">Security Score</p>
                    </div>
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-purple-500 bg-gradient-to-br from-purple-50 to-white shadow-lg">
                      {scanResults.score > 80 ? (
                        <ShieldCheck className="h-12 w-12 text-green-500" />
                      ) : scanResults.score > 60 ? (
                        <ShieldAlert className="h-12 w-12 text-amber-500" />
                      ) : (
                        <ShieldAlert className="h-12 w-12 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-purple-700">Vulnerability Summary</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <Card className="bg-red-50 border-red-100">
                        <CardContent className="p-4">
                          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-red-700">
                            {scanResults.vulnerabilities.filter((v) => v.severity === "high").length}
                          </div>
                          <p className="text-sm text-red-700">High Risk</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-amber-50 border-amber-100">
                        <CardContent className="p-4">
                          <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-amber-700">
                            {scanResults.vulnerabilities.filter((v) => v.severity === "medium").length}
                          </div>
                          <p className="text-sm text-amber-700">Medium Risk</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-blue-50 border-blue-100">
                        <CardContent className="p-4">
                          <AlertCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-blue-700">
                            {scanResults.vulnerabilities.filter((v) => v.severity === "low").length}
                          </div>
                          <p className="text-sm text-blue-700">Low Risk</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-700 mb-3">Detected Vulnerabilities</h3>
                    <div className="space-y-3">
                      {scanResults.vulnerabilities.map((vuln, i) => (
                        <Card
                          key={i}
                          className={
                            vuln.severity === "high"
                              ? "border-red-200 bg-gradient-to-r from-red-50 to-white"
                              : vuln.severity === "medium"
                                ? "border-amber-200 bg-gradient-to-r from-amber-50 to-white"
                                : "border-blue-200 bg-gradient-to-r from-blue-50 to-white"
                          }
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="font-medium flex items-center">
                                {vuln.severity === "high" && <AlertCircle className="h-5 w-5 text-red-500 mr-2" />}
                                {vuln.severity === "medium" && (
                                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                                )}
                                {vuln.severity === "low" && <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />}
                                {vuln.name}
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  vuln.severity === "high"
                                    ? "bg-red-100 text-red-700 border-red-200"
                                    : vuln.severity === "medium"
                                      ? "bg-amber-100 text-amber-700 border-amber-200"
                                      : "bg-blue-100 text-blue-700 border-blue-200"
                                }
                              >
                                {vuln.severity}
                              </Badge>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{vuln.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </CardContent>
          {!isScanning && scanResults && (
            <CardFooter className="bg-purple-50/50 border-t flex justify-between py-4">
              <Button variant="outline" className="border-purple-200">
                <EyeOff className="mr-2 h-4 w-4" />
                Hide Results
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="mr-2 h-4 w-4" />
                Export Detailed Report
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  )
}
