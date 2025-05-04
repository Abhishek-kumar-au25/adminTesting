"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Play, Pause, Volume2, VolumeX, RefreshCw, CheckCircle2 } from "lucide-react"

export function VideoControls() {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState([50])
  const [syncChecking, setSyncChecking] = useState(false)

  const handlePlayPause = () => {
    // Create a custom event that the VideoGrid component will listen for
    const event = new CustomEvent("video-play-pause", {
      detail: { playing: !playing },
    })
    window.dispatchEvent(event)
    setPlaying(!playing)
  }

  const handleMuteToggle = () => {
    // Create a custom event that the VideoGrid component will listen for
    const event = new CustomEvent("video-mute-toggle", {
      detail: { muted: !muted },
    })
    window.dispatchEvent(event)
    setMuted(!muted)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    // Create a custom event that the VideoGrid component will listen for
    const event = new CustomEvent("video-volume-change", {
      detail: { volume: value[0] / 100 },
    })
    window.dispatchEvent(event)
  }

  const handleSyncCheck = () => {
    setSyncChecking(true)
    // Simulate checking
    setTimeout(() => {
      setSyncChecking(false)
    }, 2000)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button size="lg" onClick={handlePlayPause} className="h-12 w-12 rounded-full">
              {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <div>
              <div className="text-sm font-medium">{playing ? "Playing All Videos" : "Paused"}</div>
              <div className="text-xs text-muted-foreground">
                {playing ? "Click to pause all videos" : "Click to play all videos"}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={handleMuteToggle}>
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <div className="w-24">
              <Slider value={volume} max={100} step={1} onValueChange={handleVolumeChange} disabled={muted} />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="show-timers" defaultChecked />
              <Label htmlFor="show-timers">Show Timers</Label>
            </div>
            <Button variant="outline" onClick={handleSyncCheck} disabled={syncChecking}>
              {syncChecking ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Checking Sync...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Check A/V Sync
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
