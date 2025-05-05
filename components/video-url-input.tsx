"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, RefreshCw, Link, FileVideo, Globe, Upload, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

export function VideoUrlInput() {
  const [urls, setUrls] = useState<string[]>([])
  const [newUrl, setNewUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddUrl = () => {
    if (newUrl && urls.length < 12) {
      setUrls([...urls, newUrl])
      setNewUrl("")

      // Add to video grid
      if (typeof window.addVideoUrl === "function") {
        window.addVideoUrl(newUrl)
      }

      toast({
        title: "Video URL added",
        description: "The video URL has been added to the player.",
      })
    }
  }

  const handleRemoveUrl = (index: number) => {
    const newUrls = [...urls]
    newUrls.splice(index, 1)
    setUrls(newUrls)
  }

  const handleLoadVideos = () => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => {
      setLoading(false)

      // Trigger play on all videos
      const event = new CustomEvent("video-play-pause", {
        detail: { playing: true },
      })
      window.dispatchEvent(event)

      toast({
        title: "Videos loaded",
        description: "All videos have been loaded and are ready to play.",
      })
    }, 1500)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    handleFiles(Array.from(files))
  }

  const handleFiles = (files: File[]) => {
    // Filter for video files
    const videoFiles = files.filter(
      (file) =>
        file.type.startsWith("video/") ||
        file.name.endsWith(".m3u8") ||
        file.name.endsWith(".mp4") ||
        file.name.endsWith(".webm") ||
        file.name.endsWith(".mov"),
    )

    if (videoFiles.length === 0) {
      toast({
        title: "No valid video files",
        description: "Please upload MP4, WebM, MOV, or M3U8 files.",
        variant: "destructive",
      })
      return
    }

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Add each file to the video grid
    videoFiles.forEach((file) => {
      if (typeof window.addVideoFile === "function") {
        window.addVideoFile(file)
      }
    })

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    toast({
      title: `${videoFiles.length} video${videoFiles.length > 1 ? "s" : ""} added`,
      description: "The video files have been added to the player.",
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const clearAllVideos = () => {
    setUrls([])
    if (typeof window.clearVideos === "function") {
      window.clearVideos()
    }
    toast({
      title: "All videos cleared",
      description: "All videos have been removed from the player.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Video Sources</CardTitle>
        <Button variant="outline" size="sm" onClick={clearAllVideos}>
          <X className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="url">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url" className="flex items-center">
              <Link className="mr-2 h-4 w-4" />
              URL Input
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center">
              <FileVideo className="mr-2 h-4 w-4" />
              File Upload
            </TabsTrigger>
          </TabsList>
          <TabsContent value="url" className="space-y-4 pt-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter video URL (MP4, M3U8, etc.)"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddUrl()}
              />
              <Button onClick={handleAddUrl} disabled={!newUrl || urls.length >= 12}>
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>

            <div className="rounded-md border">
              <div className="p-2 text-sm font-medium">Video URLs ({urls.length}/12)</div>
              <div className="divide-y">
                {urls.map((url, index) => (
                  <div key={index} className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-2 text-sm truncate">
                      <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate max-w-[300px]">{url}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveUrl(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {urls.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No videos added yet. Add up to 12 video URLs.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="pt-4">
            <div
              className={`rounded-md border-2 border-dashed p-8 transition-colors ${
                isDragging ? "border-primary bg-primary/5" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <FileVideo className="h-8 w-8 text-muted-foreground" />
                <div className="text-sm font-medium">Drag and drop video files</div>
                <div className="text-xs text-muted-foreground mt-1">Supports MP4, WebM, MOV, and M3U8 formats</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="video/*,.m3u8"
                  multiple
                  className="hidden"
                />
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Button
          className="w-full button-hover-effect"
          onClick={handleLoadVideos}
          disabled={loading || (urls.length === 0 && typeof window.addVideoFile !== "function")}
        >
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading Videos...
            </>
          ) : (
            "Load & Play All Videos"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
