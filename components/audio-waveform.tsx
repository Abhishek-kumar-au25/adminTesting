"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Upload, ZoomIn, ZoomOut } from "lucide-react"

export function AudioWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(100)
  const [zoom, setZoom] = useState(1)

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

  // Simulate playback
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.1
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Audio Waveform</CardTitle>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload Audio
          </Button>
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
          <Button variant="outline" size="icon">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={handlePlayPause} size="icon">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
