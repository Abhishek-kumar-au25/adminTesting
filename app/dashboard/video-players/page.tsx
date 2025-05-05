import VideoPlayersClient from "@/components/video-players-client"

export default function VideoPlayersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Video Players</h1>
      </div>
      <VideoPlayersClient />
    </div>
  )
}
