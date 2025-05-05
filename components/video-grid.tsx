"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Maximize2, Volume2, VolumeX, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function VideoGrid() {
  const [videoUrls, setVideoUrls] = useState<string[]>([])
  const [videoFiles, setVideoFiles] = useState<File[]>([])
  const [videoSources, setVideoSources] = useState<string[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [currentTimes, setCurrentTimes] = useState<number[]>([])
  const [durations, setDurations] = useState<number[]>([])
  const [videoErrors, setVideoErrors] = useState<boolean[]>([])
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)
  const [individualMuted, setIndividualMuted] = useState<boolean[]>([])

  // Initialize video refs and states when sources change
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videoSources.length)
    setCurrentTimes(Array(videoSources.length).fill(0))
    setDurations(Array(videoSources.length).fill(0))
    setVideoErrors(Array(videoSources.length).fill(false))
    setIndividualMuted(Array(videoSources.length).fill(muted))
  }, [videoSources, muted])

  // Update video sources when URLs or files change
  useEffect(() => {
    const sources = [...videoUrls, ...videoFiles.map((file) => URL.createObjectURL(file))]
    setVideoSources(sources)
  }, [videoUrls, videoFiles])

  // Update current times
  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrentTimes = videoRefs.current.map((ref) => ref?.currentTime || 0)
      setCurrentTimes(newCurrentTimes)
    }, 250)

    return () => clearInterval(interval)
  }, [])

  // Listen for global play/pause events
  useEffect(() => {
    const handlePlayPause = (e: CustomEvent) => {
      const newPlayingState = e.detail.playing
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

    const handleMuteToggle = (e: CustomEvent) => {
      const newMutedState = e.detail.muted
      setMuted(newMutedState)
      setIndividualMuted(Array(videoSources.length).fill(newMutedState))

      videoRefs.current.forEach((video) => {
        if (video) {
          video.muted = newMutedState
        }
      })
    }

    const handleVolumeChange = (e: CustomEvent) => {
      const volume = e.detail.volume

      videoRefs.current.forEach((video) => {
        if (video) {
          video.volume = volume
        }
      })
    }

    window.addEventListener("video-play-pause" as any, handlePlayPause as any)
    window.addEventListener("video-mute-toggle" as any, handleMuteToggle as any)
    window.addEventListener("video-volume-change" as any, handleVolumeChange as any)

    return () => {
      window.removeEventListener("video-play-pause" as any, handlePlayPause as any)
      window.removeEventListener("video-mute-toggle" as any, handleMuteToggle as any)
      window.removeEventListener("video-volume-change" as any, handleVolumeChange as any)
    }
  }, [videoErrors, videoSources.length])

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

  const toggleFullscreen = (index: number) => {
    setFullscreenIndex(fullscreenIndex === index ? null : index)
  }

  const toggleIndividualMute = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      const newMutedState = !individualMuted[index]
      video.muted = newMutedState

      const newIndividualMuted = [...individualMuted]
      newIndividualMuted[index] = newMutedState
      setIndividualMuted(newIndividualMuted)
    }
  }

  const removeVideo = (index: number) => {
    // If it's a file URL, revoke it to prevent memory leaks
    if (videoFiles[index]) {
      URL.revokeObjectURL(videoSources[index])
    }

    // Remove the video from all arrays
    const newUrls = [...videoUrls]
    const newFiles = [...videoFiles]

    // Determine if it's a URL or file and remove accordingly
    if (index < videoUrls.length) {
      newUrls.splice(index, 1)
      setVideoUrls(newUrls)
    } else {
      newFiles.splice(index - videoUrls.length, 1)
      setVideoFiles(newFiles)
    }
  }

  // Add URL to the list
  const addVideoUrl = useCallback(
    (url: string) => {
      if (url && videoUrls.length + videoFiles.length < 12) {
        setVideoUrls((prev) => [...prev, url])
      }
    },
    [videoUrls, videoFiles],
  )

  // Add file to the list
  const addVideoFile = useCallback(
    (file: File) => {
      if (file && videoUrls.length + videoFiles.length < 12) {
        setVideoFiles((prev) => [...prev, file])
      }
    },
    [videoUrls, videoFiles],
  )

  // Expose methods to parent components
  useEffect(() => {
    // @ts-ignore - Custom event handling
    window.addVideoUrl = addVideoUrl
    // @ts-ignore - Custom event handling
    window.addVideoFile = addVideoFile
    // @ts-ignore - Custom event handling
    window.clearVideos = () => {
      // Revoke all object URLs to prevent memory leaks
      videoFiles.forEach((_, index) => {
        URL.revokeObjectURL(videoSources[videoUrls.length + index])
      })
      setVideoUrls([])
      setVideoFiles([])
    }

    return () => {
      // @ts-ignore - Cleanup
      delete window.addVideoUrl
      // @ts-ignore - Cleanup
      delete window.addVideoFile
      // @ts-ignore - Cleanup
      delete window.clearVideos
    }
  }, [addVideoUrl, addVideoFile, videoFiles, videoSources, videoUrls.length])

  const getGridCols = () => {
    const count = videoSources.length
    if (fullscreenIndex !== null) return "grid-cols-1"
    if (count <= 1) return "grid-cols-1"
    if (count <= 2) return "grid-cols-1 md:grid-cols-2"
    if (count <= 4) return "grid-cols-1 sm:grid-cols-2"
    if (count <= 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    if (count <= 9) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  }

  if (videoSources.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
        <div className="text-center">
          <p className="text-muted-foreground">No videos added yet.</p>
          <p className="text-sm text-muted-foreground mt-1">Add videos using the controls above.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className={`grid ${getGridCols()} gap-4`}>
        {videoSources.map((url, index) => (
          <Card
            key={index}
            className={cn(
              "overflow-hidden transition-all duration-300 card-hover-effect",
              fullscreenIndex === index ? "col-span-full row-span-full" : "",
            )}
          >
            <div className="relative">
              <div className="w-full aspect-video bg-black flex items-center justify-center">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={`w-full h-auto aspect-video ${videoErrors[index] ? "hidden" : ""}`}
                  muted={individualMuted[index]}
                  playsInline
                  onLoadedMetadata={() => handleLoadedMetadata(index)}
                  onError={() => handleError(index)}
                >
                  <source src={url} type={url.includes(".m3u8") ? "application/x-mpegURL" : "video/mp4"} />
                  Your browser does not support the video tag.
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
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                    onClick={() => toggleIndividualMute(index)}
                  >
                    {individualMuted[index] ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                    onClick={() => toggleFullscreen(index)}
                  >
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                    onClick={() => removeVideo(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <Badge variant="outline" className="text-xs bg-black/50 text-white border-none">
                    Video {index + 1}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
