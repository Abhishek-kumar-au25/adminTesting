import { VideoGrid } from "@/components/video-grid"
import { VideoControls } from "@/components/video-controls"
import { VideoUrlInput } from "@/components/video-url-input"

export default function VideoPlayersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Video Players</h1>
      </div>
      <VideoUrlInput />
      <VideoControls />
      <VideoGrid />
    </div>
  )
}
