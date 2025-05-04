"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

export function VideoGrid() {
  const [videoUrls, setVideoUrls] = useState([
    "https://example.com/video1.mp4",
    "https://example.com/video2.mp4",
    "https://example.com/video3.mp4",
    "https://example.com/video4.mp4",
    "https://example.com/video5.mp4",
    "https://example.com/video6.mp4",
    "https://example.com/video7.mp4",
    "https://example.com/video8.mp4",
    "https://example.com/video9.mp4",
  ])

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [currentTimes, setCurrentTimes] = useState<number[]>(Array(videoUrls.length).fill(0))
  const [durations, setDurations] = useState<number[]>(Array(videoUrls.length).fill(0))
  const [videoErrors, setVideoErrors] = useState<boolean[]>(Array(videoUrls.length).fill(false))

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videoUrls.length)
    setCurrentTimes(Array(videoUrls.length).fill(0))
    setDurations(Array(videoUrls.length).fill(0))
    setVideoErrors(Array(videoUrls.length).fill(false))
  }, [videoUrls])

  // Update current times
  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrentTimes = videoRefs.current.map((ref) => ref?.currentTime || 0)
      setCurrentTimes(newCurrentTimes)
    }, 250)

    return () => clearInterval(interval)
  }, [])

  const handlePlayPause = () => {
    const newPlayingState = !playing
    setPlaying(newPlayingState)

    videoRefs.current.forEach((video, index) => {
      if (video && !videoErrors[index]) {
        if (newPlayingState) {
          video.play().catch((e) => {
            console.error("Error playing video:", e)
            const newErrors = [...videoErrors]
            newErrors[index] = true
            setVideoErrors(newErrors)
          })
        } else {
          video.pause()
        }
      }
    })
  }

  const handleMuteToggle = () => {
    const newMutedState = !muted
    setMuted(newMutedState)

    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = newMutedState
      }
    })
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleLoadedMetadata = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      const newDurations = [...durations]
      newDurations[index] = video.duration || 0
      setDurations(newDurations)
    }
  }

  const handleError = (index: number) => {
    const newErrors = [...videoErrors]
    newErrors[index] = true
    setVideoErrors(newErrors)
  }

  const getGridCols = () => {
    const count = videoUrls.length
    if (count <= 1) return "grid-cols-1"
    if (count <= 2) return "grid-cols-1 md:grid-cols-2"
    if (count <= 4) return "grid-cols-1 md:grid-cols-2"
    if (count <= 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    if (count <= 9) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  }

  return (
    <div className="space-y-4">
      <div className={`grid ${getGridCols()} gap-4`}>
        {videoUrls.map((url, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative">
              <div className="w-full aspect-video bg-black flex items-center justify-center">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={`w-full h-auto aspect-video ${videoErrors[index] ? "hidden" : ""}`}
                  muted={muted}
                  playsInline
                  onLoadedMetadata={() => handleLoadedMetadata(index)}
                  onError={() => handleError(index)}
                >
                  <source src={url} type="video/mp4" />
                </video>
                {videoErrors[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="text-center">
                      <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-white text-sm">Video could not be loaded</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 flex items-center justify-between">
                <div className="text-xs font-mono">
                  {formatTime(currentTimes[index])} / {formatTime(durations[index])}
                </div>
                <Badge variant="outline" className="text-xs">
                  Video {index + 1}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
