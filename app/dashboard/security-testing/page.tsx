import { SecurityTestingControls } from "@/components/security-testing-controls"
import { UrlAnalyzer } from "@/components/url-analyzer"
import { SecurityReport } from "@/components/security-report"

export default function SecurityTestingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Security Testing</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UrlAnalyzer />
        </div>
        <div>
          <SecurityTestingControls />
        </div>
      </div>
      <SecurityReport />
    </div>
  )
}
