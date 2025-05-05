"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Mail, Share2, FileSpreadsheet, FileIcon as FilePdf, Printer } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export function DefectCaseExport() {
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
          fileName = "defect-cases.pdf"
          mimeType = "application/pdf"
          break
        case "excel":
          content = "Excel content would be generated here"
          fileName = "defect-cases.xlsx"
          mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          break
        case "csv":
          content = "ID,Title,Severity,Status,Assignee\n"
          content += "DEF001,Login button not working on Safari browser,high,open,Alex Johnson\n"
          content += "DEF002,Form validation error message not displayed,medium,in-progress,Sarah Miller\n"
          content += "DEF003,Checkout process fails with specific payment method,critical,open,Unassigned\n"
          content += "DEF004,Product images not loading on mobile devices,medium,open,David Chen\n"
          content += "DEF005,Incorrect price calculation in shopping cart,high,in-progress,Emma Wilson\n"
          content += "DEF006,Password reset email not being sent,high,open,Unassigned\n"
          content += "DEF007,UI alignment issue on product details page,low,open,Michael Brown\n"
          fileName = "defect-cases.csv"
          mimeType = "text/csv"
          break
        default:
          content = "Unknown format"
          fileName = "defect-cases.txt"
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
        description: `Defect cases have been exported as ${format.toUpperCase()}`,
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
        description: "Defect case report has been emailed to your team",
      })
    }, 2000)
  }

  const handlePrintReport = () => {
    setIsExporting("print")

    // Simulate printing
    setTimeout(() => {
      setIsExporting(null)

      // In a real app, you would use window.print() here
      toast({
        title: "Print prepared",
        description: "Defect case report is ready for printing",
      })
    }, 1500)
  }

  const handleShareWithTeam = () => {
    setIsExporting("share")

    // Simulate sharing
    setTimeout(() => {
      setIsExporting(null)

      toast({
        title: "Shared with team",
        description: "Defect case report has been shared with your team",
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
            className="flex items-center justify-start"
            onClick={handlePrintReport}
            disabled={isExporting !== null}
          >
            <Printer className="mr-2 h-4 w-4" />
            {isExporting === "print" ? "Preparing..." : "Print Report"}
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-start"
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
