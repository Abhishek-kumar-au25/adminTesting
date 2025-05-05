"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Mail, Share2, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export function TestCaseExport() {
  const [isExporting, setIsExporting] = useState<string | null>(null)

  const handleExport = (format: string) => {
    setIsExporting(format)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(null)

      // Create sample content based on format
      let content = ""
      let fileName = ""
      let mimeType = ""

      switch (format) {
        case "pdf":
          content = "PDF content would be generated here"
          fileName = "test-cases.pdf"
          mimeType = "application/pdf"
          break
        case "excel":
          content = "Excel content would be generated here"
          fileName = "test-cases.xlsx"
          mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          break
        case "csv":
          content = "ID,Title,Priority,Status,Type\n"
          content += "TC001,Verify user login with valid credentials,high,active,functional\n"
          content += "TC002,Verify user login with invalid credentials,high,active,functional\n"
          content += "TC003,Verify password reset functionality,medium,active,functional\n"
          content += "TC004,Verify user registration with valid data,high,active,functional\n"
          content += "TC005,Verify form validation for required fields,medium,active,ui\n"
          content += "TC006,Verify responsive design on mobile devices,medium,active,ui\n"
          content += "TC007,Verify page load time under heavy traffic,low,draft,performance\n"
          fileName = "test-cases.csv"
          mimeType = "text/csv"
          break
        default:
          content = "Unknown format"
          fileName = "test-cases.txt"
          mimeType = "text/plain"
      }

      // Create a blob and download it
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Export complete",
        description: `Test cases have been exported as ${format.toUpperCase()}`,
      })
    }, 1500)
  }

  const handleEmailReport = () => {
    setIsExporting("email")

    // Simulate email sending
    setTimeout(() => {
      setIsExporting(null)

      toast({
        title: "Email sent",
        description: "Test case report has been emailed to your team",
      })
    }, 2000)
  }

  const handleShareWithTeam = () => {
    setIsExporting("share")

    // Simulate sharing
    setTimeout(() => {
      setIsExporting(null)

      toast({
        title: "Shared with team",
        description: "Test case report has been shared with your team",
      })
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center justify-start"
            onClick={() => handleExport("pdf")}
            disabled={isExporting !== null}
          >
            <FilePdf className="mr-2 h-4 w-4" />
            {isExporting === "pdf" ? "Exporting..." : "Export as PDF"}
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-start"
            onClick={() => handleExport("excel")}
            disabled={isExporting !== null}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            {isExporting === "excel" ? "Exporting..." : "Export as Excel"}
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-start"
            onClick={() => handleExport("csv")}
            disabled={isExporting !== null}
          >
            <FileText className="mr-2 h-4 w-4" />
            {isExporting === "csv" ? "Exporting..." : "Export as CSV"}
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-start"
            onClick={handleEmailReport}
            disabled={isExporting !== null}
          >
            <Mail className="mr-2 h-4 w-4" />
            {isExporting === "email" ? "Sending..." : "Email Report"}
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-start col-span-2"
            onClick={handleShareWithTeam}
            disabled={isExporting !== null}
          >
            <Share2 className="mr-2 h-4 w-4" />
            {isExporting === "share" ? "Sharing..." : "Share with Team"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
