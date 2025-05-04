import { AudioWaveform } from "@/components/audio-waveform"
import { AudioControls } from "@/components/audio-controls"
import { AudioMetrics } from "@/components/audio-metrics"

export default function AudioAnalyzerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Audio Analyzer</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AudioWaveform />
        </div>
        <div className="space-y-6">
          <AudioControls />
          <AudioMetrics />
        </div>
      </div>
    </div>
  )
}
