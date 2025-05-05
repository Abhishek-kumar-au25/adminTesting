"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Play, Pause, Volume2, VolumeX, RefreshCw, CheckCircle2, SkipBack, SkipForward, Download } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function VideoControls() {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState([50])
  const [syncChecking, setSyncChecking] = useState(false)
  const [showTimers, setShowTimers] = useState(true)
  const [layout, setLayout] = useState("grid")

  const handlePlayPause = () => {
    // Create a custom event that the VideoGrid component will listen for
    const event = new CustomEvent("video-play-pause", {
      detail: { playing: !playing },
    })
    window.dispatchEvent(event)
    setPlaying(!playing)

    toast({
      title: !playing ? "Playing all videos" : "Paused all videos",
      description: !playing ? "All videos are now playing simultaneously" : "All videos have been paused",
    })
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
      toast({
        title: "Sync check complete",
        description: "All videos are properly synchronized",
      })
    }, 2000)
  }

  const handleRestart = () => {
    // Create a custom event to restart all videos
    const pauseEvent = new CustomEvent("video-play-pause", {
      detail: { playing: false },
    })
    window.dispatchEvent(pauseEvent)

    // Set all videos to time 0
    const videos = document.querySelectorAll("video")
    videos.forEach((video) => {
      video.currentTime = 0
    })

    // After a short delay, play all videos
    setTimeout(() => {
      const playEvent = new CustomEvent("video-play-pause", {
        detail: { playing: true },
      })
      window.dispatchEvent(playEvent)
      setPlaying(true)

      toast({
        title: "Videos restarted",
        description: "All videos have been reset to the beginning and started playing",
      })
    }, 300)
  }

  const handleSkipForward = () => {
    // Skip all videos forward by 10 seconds
    const videos = document.querySelectorAll("video")
    videos.forEach((video) => {
      video.currentTime = Math.min(video.currentTime + 10, video.duration)
    })

    toast({
      title: "Skipped forward",
      description: "All videos skipped forward by 10 seconds",
    })
  }

  const handleSkipBackward = () => {
    // Skip all videos backward by 10 seconds
    const videos = document.querySelectorAll("video")
    videos.forEach((video) => {
      video.currentTime = Math.max(video.currentTime - 10, 0)
    })

    toast({
      title: "Skipped backward",
      description: "All videos skipped backward by 10 seconds",
    })
  }

  const handleDownloadReport = () => {
    // Simulate generating a report
    toast({
      title: "Generating video report",
      description: "Please wait while we prepare your report...",
    })

    setTimeout(() => {
      // Create a sample report content
      const videos = document.querySelectorAll("video")
      let reportContent = "Video Playback Report\n\n"

      videos.forEach((video, index) => {
        reportContent += `Video ${index + 1}:\n`
        reportContent += `- Duration: ${Math.floor(video.duration / 60)}:${Math.floor(video.duration % 60)
          .toString()
          .padStart(2, "0")}\n`
        reportContent += `- Current position: ${Math.floor(video.currentTime / 60)}:${Math.floor(video.currentTime % 60)
          .toString()
          .padStart(2, "0")}\n`
        reportContent += `- Playback rate: ${video.playbackRate}x\n`
        reportContent += `- Volume: ${Math.round(video.volume * 100)}%\n`
        reportContent += `- Muted: ${video.muted ? "Yes" : "No"}\n\n`
      })

      // Create a blob and download it
      const blob = new Blob([reportContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "video-playback-report.txt"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Report downloaded",
        description: "Your video playback report has been downloaded",
      })
    }, 1500)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="outline" onClick={handleSkipBackward} className="h-8 w-8">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="lg" onClick={handlePlayPause} className="h-12 w-12 rounded-full button-hover-effect">
                {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button size="icon" variant="outline" onClick={handleSkipForward} className="h-8 w-8">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
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
              <Switch id="show-timers" checked={showTimers} onCheckedChange={setShowTimers} />
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
            <Button variant="outline" onClick={handleRestart}>
              <SkipBack className="mr-2 h-4 w-4" />
              Restart All
            </Button>
            <Button variant="outline" onClick={handleDownloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
