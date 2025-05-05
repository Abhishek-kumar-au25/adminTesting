"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Upload, ZoomIn, ZoomOut, Download } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function AudioWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(100)
  const [zoom, setZoom] = useState(1)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio()

      // Set up event listeners
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate)
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
      audioRef.current.addEventListener("ended", handleEnded)

      // Set default audio
      audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate)
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audioRef.current.removeEventListener("ended", handleEnded)
        audioRef.current.pause()
        audioRef.current = null
      }

      // Clean up any object URLs
      if (audioUrl && audioUrl.startsWith("blob:")) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setCurrentTime(0)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasDimensions = () => {
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    updateCanvasDimensions()

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw waveform (sample data for visualization)
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = "hsl(var(--primary))"

    const centerY = canvas.height / 2
    const amplitude = canvas.height / 3

    // Generate sample waveform data
    for (let x = 0; x < canvas.width; x++) {
      // Create a more complex waveform with multiple frequencies
      const y =
        centerY +
        Math.sin(x * 0.02 * zoom) * amplitude * 0.5 +
        Math.sin(x * 0.01 * zoom) * amplitude * 0.3 +
        Math.sin(x * 0.05 * zoom) * amplitude * 0.2

      if (x === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw playhead
    const playheadX = (currentTime / duration) * canvas.width
    ctx.beginPath()
    ctx.moveTo(playheadX, 0)
    ctx.lineTo(playheadX, canvas.height)
    ctx.strokeStyle = "hsl(var(--destructive))"
    ctx.lineWidth = 2
    ctx.stroke()

    // Handle resize
    const handleResize = () => {
      updateCanvasDimensions()
      // Redraw everything
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw waveform
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = "hsl(var(--primary))"

      const centerY = canvas.height / 2
      const amplitude = canvas.height / 3

      for (let x = 0; x < canvas.width; x++) {
        const y =
          centerY +
          Math.sin(x * 0.02 * zoom) * amplitude * 0.5 +
          Math.sin(x * 0.01 * zoom) * amplitude * 0.3 +
          Math.sin(x * 0.05 * zoom) * amplitude * 0.2

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Draw playhead
      const playheadX = (currentTime / duration) * canvas.width
      ctx.beginPath()
      ctx.moveTo(playheadX, 0)
      ctx.lineTo(playheadX, canvas.height)
      ctx.strokeStyle = "hsl(var(--destructive))"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [currentTime, duration, zoom])

  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
        toast({
          title: "Playback error",
          description: "There was an error playing the audio file",
          variant: "destructive",
        })
      })
    }

    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return

    audioRef.current.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.5, 5))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.5, 0.5))
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (!file.type.startsWith("audio/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file",
        variant: "destructive",
      })
      return
    }

    // Clean up previous URL if it exists
    if (audioUrl && audioUrl.startsWith("blob:")) {
      URL.revokeObjectURL(audioUrl)
    }

    // Create a new URL for the file
    const url = URL.createObjectURL(file)
    setAudioUrl(url)
    setAudioFile(file)

    // Update audio element
    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.load()

      // Reset state
      setIsPlaying(false)
      setCurrentTime(0)
    }

    toast({
      title: "Audio loaded",
      description: `Loaded audio file: ${file.name}`,
    })
  }

  const handleSkipBack = () => {
    if (!audioRef.current) return

    audioRef.current.currentTime = 0
    setCurrentTime(0)
  }

  const handleSkipForward = () => {
    if (!audioRef.current) return

    audioRef.current.currentTime = duration
    setCurrentTime(duration)
  }

  const handleDownload = () => {
    if (!audioFile && !audioRef.current?.src) {
      toast({
        title: "No audio to download",
        description: "Please upload an audio file first",
        variant: "destructive",
      })
      return
    }

    // If we have the original file, download it
    if (audioFile) {
      const url = URL.createObjectURL(audioFile)
      const a = document.createElement("a")
      a.href = url
      a.download = audioFile.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
    // Otherwise download the current audio source
    else if (audioRef.current?.src) {
      const a = document.createElement("a")
      a.href = audioRef.current.src
      a.download = "audio-file.mp3"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    toast({
      title: "Download started",
      description: "Your audio file download has started",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Audio Waveform</CardTitle>
          <div className="flex space-x-2">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="audio/*" className="hidden" />
            <Button variant="outline" size="sm" onClick={handleUploadClick}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Audio
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-40 w-full border rounded-md overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm font-mono">{formatTime(currentTime)}</div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm font-mono">{formatTime(duration)}</div>
        </div>

        <Slider value={[currentTime]} max={duration} step={0.1} onValueChange={handleSeek} />

        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleSkipBack}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={handlePlayPause} size="icon" className="button-hover-effect">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleSkipForward}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
