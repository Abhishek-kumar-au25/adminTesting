import { DefectCaseGenerator } from "@/components/defect-case-generator"
import { DefectCaseList } from "@/components/defect-case-list"
import { DefectCaseExport } from "@/components/defect-case-export"

export default function DefectCasesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Defect Cases</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <DefectCaseGenerator />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <DefectCaseList />
          <DefectCaseExport />
        </div>
      </div>
    </div>
  )
}
