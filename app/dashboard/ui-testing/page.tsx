import { DeviceEmulator } from "@/components/device-emulator"
import { ResponsiveTestingControls } from "@/components/responsive-testing-controls"
import { DeviceList } from "@/components/device-list"

export default function UITestingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">UI Responsive Testing</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DeviceEmulator />
        </div>
        <div className="space-y-6">
          <ResponsiveTestingControls />
          <DeviceList />
        </div>
      </div>
    </div>
  )
}
