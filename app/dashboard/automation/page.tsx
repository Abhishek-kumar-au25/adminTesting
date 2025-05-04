import { AutomationScripts } from "@/components/automation-scripts"
import { ScriptEditor } from "@/components/script-editor"
import { ScriptResults } from "@/components/script-results"

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Automation Scripts</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <AutomationScripts />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <ScriptEditor />
          <ScriptResults />
        </div>
      </div>
    </div>
  )
}
