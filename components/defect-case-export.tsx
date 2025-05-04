import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Mail, Share2, FileSpreadsheet, FileIcon as FilePdf, Printer } from "lucide-react"

export function DefectCaseExport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center justify-start">
            <FilePdf className="mr-2 h-4 w-4" />
            Export as PDF
          </Button>
          <Button variant="outline" className="flex items-center justify-start">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export as Excel
          </Button>
          <Button variant="outline" className="flex items-center justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Export as CSV
          </Button>
          <Button variant="outline" className="flex items-center justify-start">
            <Mail className="mr-2 h-4 w-4" />
            Email Report
          </Button>
          <Button variant="outline" className="flex items-center justify-start">
            <Printer className="mr-2 h-4 w-4" />
            Print Report
          </Button>
          <Button variant="outline" className="flex items-center justify-start">
            <Share2 className="mr-2 h-4 w-4" />
            Share with Team
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
