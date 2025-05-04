"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw, Shield, AlertTriangle, CheckCircle } from "lucide-react"

export function UrlAnalyzer() {
  const [url, setUrl] = useState("https://example.com")
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleAnalyze = () => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  // Sample data for demonstration
  const urls = [
    {
      url: "https://example.com/api/users",
      type: "API",
      method: "GET",
      status: "secure",
      risk: "low",
    },
    {
      url: "https://example.com/api/auth",
      type: "API",
      method: "POST",
      status: "warning",
      risk: "medium",
    },
    {
      url: "https://example.com/js/analytics.js",
      type: "Script",
      method: "GET",
      status: "secure",
      risk: "low",
    },
    {
      url: "https://third-party.com/tracker.js",
      type: "Script",
      method: "GET",
      status: "insecure",
      risk: "high",
    },
    {
      url: "https://example.com/css/main.css",
      type: "Resource",
      method: "GET",
      status: "secure",
      risk: "low",
    },
    {
      url: "https://example.com/api/data",
      type: "API",
      method: "POST",
      status: "warning",
      risk: "medium",
    },
    {
      url: "https://example.com/images/logo.png",
      type: "Resource",
      method: "GET",
      status: "secure",
      risk: "low",
    },
    {
      url: "https://cdn.example.com/lib.js",
      type: "Script",
      method: "GET",
      status: "secure",
      risk: "low",
    },
  ]

  const filteredUrls = urls.filter(
    (item) =>
      item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "secure":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "insecure":
        return <Shield className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getStatusBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
            Medium
          </Badge>
        )
      case "high":
        return <Badge variant="destructive">High</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>URL Analyzer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Enter website URL to analyze"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAnalyze} disabled={loading}>
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analyzing
              </>
            ) : (
              "Analyze"
            )}
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search URLs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUrls.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.url}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.method}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className="ml-2 capitalize">{item.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.risk)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
