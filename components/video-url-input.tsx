"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, RefreshCw, Link, FileVideo, Globe } from "lucide-react"

export function VideoUrlInput() {
  const [urls, setUrls] = useState<string[]>([
    "https://example.com/video1.mp4",
    "https://example.com/video2.mp4",
    "https://example.com/video3.mp4",
  ])
  const [newUrl, setNewUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddUrl = () => {
    if (newUrl && urls.length < 12) {
      setUrls([...urls, newUrl])
      setNewUrl("")
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
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Sources</CardTitle>
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
                      <Globe className="h-4 w-4 text-muted-foreground" />
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
            <div className="rounded-md border border-dashed p-8">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <FileVideo className="h-8 w-8 text-muted-foreground" />
                <div className="text-sm font-medium">Drag and drop video files</div>
                <div className="text-xs text-muted-foreground">Supports MP4, WebM, MOV, and other formats</div>
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button className="w-full" onClick={handleLoadVideos} disabled={loading || urls.length === 0}>
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading Videos...
            </>
          ) : (
            "Load Videos"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
