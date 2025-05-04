"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Smartphone, Tablet, Laptop, Monitor } from "lucide-react"

export function DeviceEmulator() {
  const [url, setUrl] = useState("https://example.com")
  const [loading, setLoading] = useState(false)
  const [deviceSize, setDeviceSize] = useState("mobile")

  const handleLoadUrl = () => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const deviceSizes = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    laptop: { width: 1366, height: 768 },
    desktop: { width: 1920, height: 1080 },
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center space-x-2 border-b p-4">
        <Input
          placeholder="Enter URL to test"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
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
      <CardContent className="p-0">
        <div className="flex justify-center p-4">
          <div
            className="bg-white border overflow-hidden transition-all duration-300"
            style={{
              width: `${deviceSizes[deviceSize as keyof typeof deviceSizes].width / 4}px`,
              height: `${deviceSizes[deviceSize as keyof typeof deviceSizes].height / 4}px`,
              maxWidth: "100%",
              maxHeight: "500px",
            }}
          >
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <div className="text-center p-4">
                <p className="text-sm font-medium">
                  {deviceSize.charAt(0).toUpperCase() + deviceSize.slice(1)} Preview
                </p>
                <p className="text-xs text-muted-foreground">
                  {deviceSizes[deviceSize as keyof typeof deviceSizes].width} x{" "}
                  {deviceSizes[deviceSize as keyof typeof deviceSizes].height}
                </p>
                <p className="text-xs mt-2">{url}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
