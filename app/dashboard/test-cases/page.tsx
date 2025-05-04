import { TestCaseGenerator } from "@/components/test-case-generator"
import { TestCaseList } from "@/components/test-case-list"
import { TestCaseExport } from "@/components/test-case-export"

export default function TestCasesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Test Cases</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <TestCaseGenerator />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <TestCaseList />
          <TestCaseExport />
        </div>
      </div>
    </div>
  )
}
