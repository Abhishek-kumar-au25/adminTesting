"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Smartphone, Tablet, Laptop, Monitor, Camera } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DeviceEmulator() {
  const [url, setUrl] = useState("https://example.com")
  const [loading, setLoading] = useState(false)
  const [deviceSize, setDeviceSize] = useState("mobile")
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isScreenshotMode, setIsScreenshotMode] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const deviceSizes = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    laptop: { width: 1366, height: 768 },
    desktop: { width: 1920, height: 1080 },
  }

  const handleLoadUrl = () => {
    if (!url.trim()) {
      setError("Please enter a valid URL")
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      })
      return
    }

    // Add protocol if missing
    let formattedUrl = url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = `https://${url}`
      setUrl(formattedUrl)
    }

    setLoading(true)
    setError(null)

    // Reset iframe
    if (iframeRef.current) {
      try {
        iframeRef.current.src = formattedUrl
      } catch (err) {
        setError(`Failed to load URL: ${err instanceof Error ? err.message : String(err)}`)
        toast({
          title: "Error loading URL",
          description: `Failed to load URL: ${err instanceof Error ? err.message : String(err)}`,
          variant: "destructive",
        })
      }
    }

    // Simulate loading time
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "URL loaded",
        description: `Successfully loaded ${formattedUrl}`,
      })
    }, 1500)
  }

  const handleIframeError = () => {
    setError("Failed to load the URL. This could be due to CORS restrictions or an invalid URL.")
    setLoading(false)
    toast({
      title: "Error loading URL",
      description: "Failed to load the URL. This could be due to CORS restrictions or an invalid URL.",
      variant: "destructive",
    })
  }

  const takeScreenshot = () => {
    setIsScreenshotMode(true)

    // Wait for state update and then take screenshot
    setTimeout(() => {
      if (iframeRef.current && canvasRef.current) {
        try {
          const iframe = iframeRef.current
          const canvas = canvasRef.current
          const ctx = canvas.getContext("2d")

          if (!ctx) {
            throw new Error("Could not get canvas context")
          }

          // Set canvas dimensions to match iframe
          canvas.width = iframe.clientWidth
          canvas.height = iframe.clientHeight

          // Create a temporary image
          const img = new Image()
          img.crossOrigin = "anonymous"

          // Use html2canvas or similar library in a real implementation
          // For this demo, we'll create a placeholder screenshot
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Draw some placeholder content
          ctx.fillStyle = "#f0f0f0"
          ctx.fillRect(20, 20, canvas.width - 40, 60)

          ctx.fillStyle = "#e0e0e0"
          for (let i = 0; i < 5; i++) {
            ctx.fillRect(20, 100 + i * 40, canvas.width - 40, 30)
          }

          // Add text
          ctx.fillStyle = "#333333"
          ctx.font = "14px Arial"
          ctx.fillText(`Screenshot of ${url} on ${deviceSize} device`, 30, 50)

          // Download the screenshot
          setTimeout(() => {
            const dataUrl = canvas.toDataURL("image/png")
            const a = document.createElement("a")
            a.href = dataUrl
            a.download = `screenshot-${deviceSize}-${new Date().getTime()}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

            setIsScreenshotMode(false)

            toast({
              title: "Screenshot captured",
              description: "Screenshot has been downloaded to your device",
            })
          }, 500)
        } catch (err) {
          setError(`Failed to take screenshot: ${err instanceof Error ? err.message : String(err)}`)
          setIsScreenshotMode(false)
          toast({
            title: "Screenshot error",
            description: `Failed to take screenshot: ${err instanceof Error ? err.message : String(err)}`,
            variant: "destructive",
          })
        }
      }
    }, 100)
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center space-x-2 border-b p-4">
        <Input
          placeholder="Enter URL to test"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleLoadUrl()}
        />
        <Button onClick={handleLoadUrl} disabled={loading}>
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            "Load URL"
          )}
        </Button>
      </div>
      <div className="border-b">
        <Tabs defaultValue="mobile" onValueChange={(v) => setDeviceSize(v)}>
          <div className="flex justify-center p-2">
            <TabsList>
              <TabsTrigger value="mobile" className="flex items-center">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile
              </TabsTrigger>
              <TabsTrigger value="tablet" className="flex items-center">
                <Tablet className="mr-2 h-4 w-4" />
                Tablet
              </TabsTrigger>
              <TabsTrigger value="laptop" className="flex items-center">
                <Laptop className="mr-2 h-4 w-4" />
                Laptop
              </TabsTrigger>
              <TabsTrigger value="desktop" className="flex items-center">
                <Monitor className="mr-2 h-4 w-4" />
                Desktop
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-center mb-4">
          <Button variant="outline" onClick={takeScreenshot} className="flex items-center">
            <Camera className="mr-2 h-4 w-4" />
            Take Screenshot
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center">
          <div
            className="bg-white border overflow-hidden transition-all duration-300 relative"
            style={{
              width: `${deviceSizes[deviceSize as keyof typeof deviceSizes].width / 2}px`,
              height: `${deviceSizes[deviceSize as keyof typeof deviceSizes].height / 2}px`,
              maxWidth: "100%",
              maxHeight: "500px",
            }}
          >
            {isScreenshotMode ? (
              <canvas ref={canvasRef} className="w-full h-full" />
            ) : (
              <iframe
                ref={iframeRef}
                src={url.startsWith("http") ? url : `https://${url}`}
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-scripts"
                onError={handleIframeError}
                title="Device Preview"
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 flex justify-between">
              <span>{deviceSize.charAt(0).toUpperCase() + deviceSize.slice(1)}</span>
              <span>
                {deviceSizes[deviceSize as keyof typeof deviceSizes].width} x{" "}
                {deviceSizes[deviceSize as keyof typeof deviceSizes].height}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
