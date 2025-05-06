"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, Upload, Download, Mic, Volume2, ZoomIn, ZoomOut, SkipBack, SkipForward } from "lucide-react"

export default function AudioAnalyzerPanel() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(75)
  const [zoomLevel, setZoomLevel] = useState(1)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setAudioFile(file)

      if (audioRef.current) {
        const url = URL.createObjectURL(file)
        audioRef.current.src = url
        audioRef.current.load()

        audioRef.current.onloadedmetadata = () => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration)
          }
        }

        setupAudioContext()
      }
    }
  }

  const setupAudioContext = () => {
    if (!audioRef.current) return

    // Create audio context if it doesn't exist
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    // Create analyzer if it doesn't exist
    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 2048
    }

    // Connect audio element to analyzer
    const source = audioContextRef.current.createMediaElementSource(audioRef.current)
    source.connect(analyserRef.current)
    analyserRef.current.connect(audioContextRef.current.destination)

    // Start visualization
    visualize()
  }

  const visualize = () => {
    if (!canvasRef.current || !analyserRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    ctx.clearRect(0, 0, width, height)

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)

      analyserRef.current!.getByteTimeDomainData(dataArray)

      ctx.fillStyle = "rgb(20, 20, 20)"
      ctx.fillRect(0, 0, width, height)

      ctx.lineWidth = 2
      ctx.strokeStyle = "rgb(0, 200, 100)"
      ctx.beginPath()

      const sliceWidth = (width * zoomLevel) / bufferLength
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * height) / 2

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        x += sliceWidth
      }

      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()

      // Update current time
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }

    draw()
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0])
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)

    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5)
    }
  }

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audio Analyzer</CardTitle>
          <CardDescription>Analyze and visualize audio files with waveform display</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="waveform" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="waveform">Waveform</TabsTrigger>
              <TabsTrigger value="spectrum">Spectrum</TabsTrigger>
              <TabsTrigger value="recorder">Recorder</TabsTrigger>
            </TabsList>
            <TabsContent value="waveform" className="space-y-4 pt-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="audio-file">Audio File</Label>
                <div className="flex space-x-2">
                  <Input id="audio-file" type="file" accept="audio/*" onChange={handleFileChange} className="flex-1" />
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-2">
                <canvas ref={canvasRef} width={800} height={200} className="w-full h-[200px] bg-black/10 rounded" />
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
                  onChange={handleTimeChange}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={skipBackward}>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button onClick={togglePlayPause} className="w-20">
                    {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={skipForward}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="w-24"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <ZoomOut className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[zoomLevel]}
                  min={0.5}
                  max={4}
                  step={0.1}
                  onValueChange={handleZoomChange}
                  className="flex-1"
                />
                <ZoomIn className="h-4 w-4 text-muted-foreground" />
              </div>

              <audio ref={audioRef} className="hidden" />
            </TabsContent>
            <TabsContent value="spectrum" className="pt-4">
              <div className="rounded-md border bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Spectrum analyzer visualization will be displayed here. Upload an audio file to see the frequency
                  spectrum.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="recorder" className="pt-4">
              <div className="flex flex-col items-center justify-center space-y-4 p-6">
                <div className="rounded-full bg-primary/10 p-6">
                  <Mic className="h-12 w-12 text-primary" />
                </div>
                <Button className="w-40">Start Recording</Button>
                <p className="text-sm text-muted-foreground">Click to start recording audio for analysis</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Select defaultValue="waveform">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Visualization Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="waveform">Waveform</SelectItem>
                <SelectItem value="spectrum">Frequency Spectrum</SelectItem>
                <SelectItem value="spectrogram">Spectrogram</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Analysis
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
