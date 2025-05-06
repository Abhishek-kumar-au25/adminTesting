"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Trash2,
  Plus,
  RotateCw,
  Download,
  CheckCircle2,
  AlertTriangle,
  FileVideo,
  Link,
  Grid2X2,
  Grid3X3,
  Grid2x2XIcon as Grid4X4,
  Layers,
} from "lucide-react"
import { cn } from "@/lib/utils"

type VideoSource = {
  id: string
  name: string
  url: string
  type: string
  status: "loading" | "ready" | "error" | "empty"
  syncStatus?: "synced" | "out-of-sync" | "unknown"
}

export default function MultiVideoPlayer() {
  const [videoSources, setVideoSources] = useState<VideoSource[]>([
    { id: "1", name: "Video 1", url: "", type: "mp4", status: "empty", syncStatus: "unknown" },
    { id: "2", name: "Video 2", url: "", type: "mp4", status: "empty", syncStatus: "unknown" },
    { id: "3", name: "Video 3", url: "", type: "mp4", status: "empty", syncStatus: "unknown" },
    { id: "4", name: "Video 4", url: "", type: "mp4", status: "empty", syncStatus: "unknown" },
  ])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [layout, setLayout] = useState<"2x2" | "3x3" | "4x3">("2x2")
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [syncTolerance, setSyncTolerance] = useState(0.5) // in seconds
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videoSources.length)
  }, [videoSources.length])

  const togglePlayPause = () => {
    const newPlayingState = !isPlaying
    setIsPlaying(newPlayingState)

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        if (newPlayingState) {
          videoRef.play().catch((error) => {
            console.error("Error playing video:", error)
            setIsPlaying(false)
          })
        } else {
          videoRef.pause()
        }
      }
    })
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        videoRef.volume = newVolume / 100
        videoRef.muted = newVolume === 0
      }
    })
  }

  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        videoRef.muted = newMutedState
      }
    })
  }

  const handleTimeUpdate = (index: number) => {
    const videoRef = videoRefs.current[index]
    if (!videoRef) return

    // Update current time based on the first video
    if (index === 0) {
      setCurrentTime(videoRef.currentTime)
    }

    // Check sync status
    checkSyncStatus()
  }

  const checkSyncStatus = () => {
    const activeVideos = videoRefs.current.filter((ref) => ref && !ref.paused && ref.readyState > 2)
    if (activeVideos.length <= 1) return

    const referenceTime = activeVideos[0].currentTime

    const newVideoSources = [...videoSources]
    let allSynced = true

    activeVideos.forEach((videoRef, index) => {
      if (!videoRef) return

      const timeDifference = Math.abs(videoRef.currentTime - referenceTime)
      const syncStatus = timeDifference <= syncTolerance ? "synced" : "out-of-sync"

      if (syncStatus === "out-of-sync") {
        allSynced = false
      }

      // Find the corresponding video source
      const sourceIndex = videoSources.findIndex(
        (source) => source.status === "ready" && videoRefs.current.indexOf(videoRef) === sourceIndex,
      )
      if (sourceIndex !== -1) {
        newVideoSources[sourceIndex].syncStatus = syncStatus
      }
    })

    setVideoSources(newVideoSources)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        videoRef.currentTime = newTime
      }
    })
  }

  const handleVideoLoad = (index: number) => {
    const videoRef = videoRefs.current[index]
    if (!videoRef) return

    // Update duration based on the first loaded video
    if (index === 0 || duration === 0) {
      setDuration(videoRef.duration || 0)
    }

    // Update video source status
    const newVideoSources = [...videoSources]
    newVideoSources[index].status = "ready"
    setVideoSources(newVideoSources)
  }

  const handleVideoError = (index: number) => {
    const newVideoSources = [...videoSources]
    newVideoSources[index].status = "error"
    setVideoSources(newVideoSources)
  }

  const addVideoSource = () => {
    if (videoSources.length >= 12) return

    const newId = (Math.max(0, ...videoSources.map((s) => Number.parseInt(s.id))) + 1).toString()
    setVideoSources([
      ...videoSources,
      {
        id: newId,
        name: `Video ${newId}`,
        url: "",
        type: "mp4",
        status: "empty",
        syncStatus: "unknown",
      },
    ])
  }

  const removeVideoSource = (id: string) => {
    if (videoSources.length <= 1) return
    setVideoSources(videoSources.filter((source) => source.id !== id))
  }

  const updateVideoSource = (id: string, url: string, type = "mp4") => {
    const newVideoSources = videoSources.map((source) =>
      source.id === id
        ? {
            ...source,
            url,
            type,
            status: url ? "loading" : "empty",
            syncStatus: "unknown",
          }
        : source,
    )
    setVideoSources(newVideoSources)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const syncAllVideos = () => {
    const referenceVideo = videoRefs.current.find((ref) => ref && ref.readyState > 2)
    if (!referenceVideo) return

    const referenceTime = referenceVideo.currentTime

    videoRefs.current.forEach((videoRef) => {
      if (videoRef && Math.abs(videoRef.currentTime - referenceTime) > syncTolerance) {
        videoRef.currentTime = referenceTime
      }
    })

    // Update sync status
    const newVideoSources = videoSources.map((source) => ({
      ...source,
      syncStatus: source.status === "ready" ? "synced" : source.syncStatus,
    }))
    setVideoSources(newVideoSources)
  }

  const getGridClass = () => {
    switch (layout) {
      case "3x3":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      case "4x3":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      default:
        return "grid-cols-1 sm:grid-cols-2"
    }
  }

  const getSyncStatusIcon = (status?: string) => {
    switch (status) {
      case "synced":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "out-of-sync":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-purple-500 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Layers className="mr-2 h-5 w-5" />
            Multi-Video Player
          </CardTitle>
          <CardDescription>Play and analyze multiple videos simultaneously</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="player" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-purple-100/50 p-1 rounded-xl">
              <TabsTrigger value="player">Video Player</TabsTrigger>
              <TabsTrigger value="sources">Video Sources</TabsTrigger>
            </TabsList>

            <TabsContent value="player" className="pt-4">
              <div className="space-y-4">
                <div className={`grid ${getGridClass()} gap-4`}>
                  {videoSources.map((source, index) => (
                    <Card key={source.id} className="overflow-hidden">
                      <div className="relative aspect-video bg-black">
                        {source.status === "empty" ? (
                          <div className="flex h-full items-center justify-center">
                            <FileVideo className="h-12 w-12 text-gray-400" />
                          </div>
                        ) : (
                          <>
                            <video
                              ref={(el) => (videoRefs.current[index] = el)}
                              src={source.url}
                              className="h-full w-full object-contain"
                              onLoadedData={() => handleVideoLoad(index)}
                              onError={() => handleVideoError(index)}
                              onTimeUpdate={() => handleTimeUpdate(index)}
                              muted={isMuted}
                            />
                            <div className="absolute bottom-2 right-2 flex items-center space-x-1">
                              {getSyncStatusIcon(source.syncStatus)}
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  source.status === "ready"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : source.status === "error"
                                      ? "bg-red-100 text-red-700 border-red-200"
                                      : "bg-gray-100 text-gray-700 border-gray-200",
                                )}
                              >
                                {source.status === "ready" ? "Ready" : source.status === "error" ? "Error" : "Loading"}
                              </Badge>
                            </div>
                          </>
                        )}
                      </div>
                      <CardFooter className="flex justify-between py-2 px-3 bg-gray-50">
                        <span className="text-sm font-medium truncate">{source.name}</span>
                        <div className="flex items-center space-x-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => removeVideoSource(source.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove video</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{formatTime(currentTime)}</span>
                    <span className="text-sm">{formatTime(duration)}</span>
                  </div>
                  <Input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={togglePlayPause}
                      className="w-24 bg-purple-600 hover:bg-purple-700"
                      disabled={videoSources.every((s) => s.status !== "ready")}
                    >
                      {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-200"
                      onClick={syncAllVideos}
                      disabled={videoSources.filter((s) => s.status === "ready").length <= 1}
                    >
                      <RotateCw className="mr-2 h-4 w-4" />
                      Sync All
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <Slider
                        value={[volume]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                        className="w-24"
                      />
                    </div>

                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn("h-8 w-8 border-purple-200", layout === "2x2" && "bg-purple-100 text-purple-700")}
                        onClick={() => setLayout("2x2")}
                      >
                        <Grid2X2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn("h-8 w-8 border-purple-200", layout === "3x3" && "bg-purple-100 text-purple-700")}
                        onClick={() => setLayout("3x3")}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn("h-8 w-8 border-purple-200", layout === "4x3" && "bg-purple-100 text-purple-700")}
                        onClick={() => setLayout("4x3")}
                      >
                        <Grid4X4 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sources" className="pt-4">
              <div className="space-y-4">
                <ScrollArea className="h-[400px] rounded-md border">
                  <div className="p-4 space-y-4">
                    {videoSources.map((source) => (
                      <Card key={source.id} className="overflow-hidden">
                        <CardHeader className="py-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                              <Input
                                value={source.name}
                                onChange={(e) =>
                                  setVideoSources(
                                    videoSources.map((s) => (s.id === source.id ? { ...s, name: e.target.value } : s)),
                                  )
                                }
                                className="h-8 w-40 sm:w-60"
                              />
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeVideoSource(source.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`url-${source.id}`}>Video URL</Label>
                              <div className="flex space-x-2">
                                <div className="relative flex-1">
                                  <Link className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    id={`url-${source.id}`}
                                    placeholder="https://example.com/video.mp4"
                                    value={source.url}
                                    onChange={(e) => updateVideoSource(source.id, e.target.value, source.type)}
                                    className="pl-8"
                                  />
                                </div>
                                <Button variant="outline" className="border-purple-200">
                                  <Upload className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`type-${source.id}`}>Video Type</Label>
                              <Select
                                value={source.type}
                                onValueChange={(value) => updateVideoSource(source.id, source.url, value)}
                              >
                                <SelectTrigger id={`type-${source.id}`}>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mp4">MP4</SelectItem>
                                  <SelectItem value="m3u8">HLS (m3u8)</SelectItem>
                                  <SelectItem value="webm">WebM</SelectItem>
                                  <SelectItem value="mov">MOV</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`autoplay-${source.id}`}
                              checked={isPlaying}
                              onCheckedChange={togglePlayPause}
                            />
                            <Label htmlFor={`autoplay-${source.id}`}>Autoplay</Label>
                          </div>
                        </CardContent>
                        <CardFooter className="py-3 bg-gray-50 flex justify-between">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              source.status === "ready"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : source.status === "error"
                                  ? "bg-red-100 text-red-700 border-red-200"
                                  : source.status === "empty"
                                    ? "bg-gray-100 text-gray-700 border-gray-200"
                                    : "bg-blue-100 text-blue-700 border-blue-200",
                            )}
                          >
                            {source.status === "ready"
                              ? "Ready"
                              : source.status === "error"
                                ? "Error"
                                : source.status === "empty"
                                  ? "No Source"
                                  : "Loading"}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-200"
                            onClick={() => {
                              const videoRef = videoRefs.current.find((_, i) => videoSources[i].id === source.id)
                              if (videoRef) {
                                videoRef.load()
                              }
                            }}
                          >
                            <RotateCw className="mr-2 h-3 w-3" />
                            Reload
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex justify-between">
                  <Button
                    onClick={addVideoSource}
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={videoSources.length >= 12}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Video Source
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" className="border-purple-200">
                      <Download className="mr-2 h-4 w-4" />
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-purple-50/50 border-t flex justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="sync-tolerance" className="text-sm">
              Sync Tolerance:
            </Label>
            <Select value={syncTolerance.toString()} onValueChange={(v) => setSyncTolerance(Number.parseFloat(v))}>
              <SelectTrigger id="sync-tolerance" className="w-[120px] h-8">
                <SelectValue placeholder="Tolerance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">0.1 seconds</SelectItem>
                <SelectItem value="0.5">0.5 seconds</SelectItem>
                <SelectItem value="1">1 second</SelectItem>
                <SelectItem value="2">2 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {videoSources.filter((s) => s.status === "ready").length} of {videoSources.length} videos loaded
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
