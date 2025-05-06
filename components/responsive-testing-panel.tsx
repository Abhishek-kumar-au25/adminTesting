"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Search,
  RotateCcw,
  Bookmark,
  BookmarkPlus,
  Download,
  Camera,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ResponsiveTestingPanel() {
  const [url, setUrl] = useState("")
  const [viewportSize, setViewportSize] = useState({ width: 1280, height: 800 })
  const [deviceType, setDeviceType] = useState("desktop")
  const [orientation, setOrientation] = useState("portrait")
  const [savedDevices, setSavedDevices] = useState<string[]>([])
  const [showGrid, setShowGrid] = useState(false)
  const [gridSize, setGridSize] = useState(16)
  const [gridColor, setGridColor] = useState("rgba(128, 0, 128, 0.2)")
  const [zoom, setZoom] = useState(0.75)
  const [isLoading, setIsLoading] = useState(false)
  const [screenshotDialogOpen, setScreenshotDialogOpen] = useState(false)
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)

  // Comprehensive device list organized by manufacturer and type
  const deviceCategories = [
    {
      label: "Apple Devices",
      devices: [
        { name: "iPhone SE", width: 375, height: 667, type: "mobile" },
        { name: "iPhone 8", width: 375, height: 667, type: "mobile" },
        { name: "iPhone X/XS/11 Pro", width: 375, height: 812, type: "mobile" },
        { name: "iPhone XR/11", width: 414, height: 896, type: "mobile" },
        { name: "iPhone 12/13 Mini", width: 360, height: 780, type: "mobile" },
        { name: "iPhone 12/13/14", width: 390, height: 844, type: "mobile" },
        { name: "iPhone 12/13/14 Pro Max", width: 428, height: 926, type: "mobile" },
        { name: "iPhone 15", width: 393, height: 852, type: "mobile" },
        { name: "iPhone 15 Pro Max", width: 430, height: 932, type: "mobile" },
        { name: "iPad Mini", width: 768, height: 1024, type: "tablet" },
        { name: "iPad", width: 810, height: 1080, type: "tablet" },
        { name: "iPad Air", width: 820, height: 1180, type: "tablet" },
        { name: 'iPad Pro 11"', width: 834, height: 1194, type: "tablet" },
        { name: 'iPad Pro 12.9"', width: 1024, height: 1366, type: "tablet" },
        { name: "MacBook Air", width: 1280, height: 800, type: "desktop" },
        { name: 'MacBook Pro 13"', width: 1440, height: 900, type: "desktop" },
        { name: 'MacBook Pro 14"', width: 1512, height: 982, type: "desktop" },
        { name: 'MacBook Pro 16"', width: 1728, height: 1117, type: "desktop" },
        { name: 'iMac 24"', width: 1920, height: 1080, type: "desktop" },
        { name: 'iMac 27"', width: 2560, height: 1440, type: "desktop" },
      ],
    },
    {
      label: "Samsung Devices",
      devices: [
        { name: "Galaxy S10e", width: 360, height: 760, type: "mobile" },
        { name: "Galaxy S10/S20", width: 360, height: 800, type: "mobile" },
        { name: "Galaxy S21/S22", width: 384, height: 854, type: "mobile" },
        { name: "Galaxy S23", width: 393, height: 873, type: "mobile" },
        { name: "Galaxy S23 Ultra", width: 412, height: 915, type: "mobile" },
        { name: "Galaxy Z Flip", width: 412, height: 846, type: "mobile" },
        { name: "Galaxy Z Fold", width: 280, height: 653, type: "mobile" }, // Folded
        { name: "Galaxy Z Fold (Unfolded)", width: 585, height: 653, type: "tablet" },
        { name: "Galaxy Tab S7", width: 800, height: 1280, type: "tablet" },
        { name: "Galaxy Tab S8 Ultra", width: 1120, height: 1752, type: "tablet" },
      ],
    },
    {
      label: "Google Devices",
      devices: [
        { name: "Pixel 4", width: 360, height: 800, type: "mobile" },
        { name: "Pixel 5", width: 393, height: 851, type: "mobile" },
        { name: "Pixel 6", width: 412, height: 915, type: "mobile" },
        { name: "Pixel 6 Pro", width: 412, height: 936, type: "mobile" },
        { name: "Pixel 7", width: 412, height: 915, type: "mobile" },
        { name: "Pixel 7 Pro", width: 412, height: 936, type: "mobile" },
        { name: "Pixel Tablet", width: 834, height: 1112, type: "tablet" },
        { name: "Pixelbook", width: 1200, height: 800, type: "desktop" },
      ],
    },
    {
      label: "Microsoft Devices",
      devices: [
        { name: "Surface Duo", width: 540, height: 720, type: "mobile" },
        { name: "Surface Go", width: 800, height: 1280, type: "tablet" },
        { name: "Surface Pro", width: 912, height: 1368, type: "tablet" },
        { name: "Surface Book", width: 1500, height: 1000, type: "desktop" },
        { name: "Surface Studio", width: 2560, height: 1440, type: "desktop" },
      ],
    },
    {
      label: "Standard Resolutions",
      devices: [
        { name: "HD (720p)", width: 1280, height: 720, type: "desktop" },
        { name: "Full HD (1080p)", width: 1920, height: 1080, type: "desktop" },
        { name: "QHD (1440p)", width: 2560, height: 1440, type: "desktop" },
        { name: "4K UHD", width: 3840, height: 2160, type: "desktop" },
        { name: "8K UHD", width: 7680, height: 4320, type: "desktop" },
      ],
    },
    {
      label: "TV & Large Displays",
      devices: [
        { name: "720p TV", width: 1280, height: 720, type: "tv" },
        { name: "1080p TV", width: 1920, height: 1080, type: "tv" },
        { name: "4K TV", width: 3840, height: 2160, type: "tv" },
        { name: "8K TV", width: 7680, height: 4320, type: "tv" },
        { name: "Ultra-wide Monitor", width: 3440, height: 1440, type: "tv" },
        { name: "Super Ultra-wide", width: 5120, height: 1440, type: "tv" },
      ],
    },
  ]

  // Flatten the device list for searching
  const allDevices = deviceCategories.flatMap((category) => category.devices)

  const handleDeviceSelect = (deviceName: string) => {
    const selectedDevice = allDevices.find((d) => d.name === deviceName)
    if (selectedDevice) {
      setViewportSize({
        width:
          orientation === "landscape" && selectedDevice.type !== "desktop" && selectedDevice.type !== "tv"
            ? selectedDevice.height
            : selectedDevice.width,
        height:
          orientation === "landscape" && selectedDevice.type !== "desktop" && selectedDevice.type !== "tv"
            ? selectedDevice.width
            : selectedDevice.height,
      })
      setDeviceType(selectedDevice.type)
    }
  }

  const handleOrientationChange = (newOrientation: string) => {
    setOrientation(newOrientation)
    // Swap width and height if changing orientation and not a desktop or TV
    if (deviceType !== "desktop" && deviceType !== "tv") {
      setViewportSize({ width: viewportSize.height, height: viewportSize.width })
    }
  }

  const handleCustomSize = (dimension: "width" | "height", value: string) => {
    const numValue = Number.parseInt(value) || 0
    setViewportSize((prev) => ({ ...prev, [dimension]: numValue }))
  }

  const saveCurrentDevice = () => {
    const currentDevice = allDevices.find((d) => d.width === viewportSize.width && d.height === viewportSize.height)
    const deviceName = currentDevice ? currentDevice.name : `Custom (${viewportSize.width}×${viewportSize.height})`

    if (!savedDevices.includes(deviceName)) {
      setSavedDevices([...savedDevices, deviceName])
    }
  }

  const loadWebsite = () => {
    if (!url) return
    setIsLoading(true)
    // Reset iframe to force reload
    if (iframeRef.current) {
      iframeRef.current.src = url
    }
  }

  const refreshWebsite = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
      setIsLoading(true)
    }
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const takeScreenshot = () => {
    if (!iframeRef.current || !previewContainerRef.current) return

    try {
      const canvas = document.createElement("canvas")
      canvas.width = viewportSize.width
      canvas.height = viewportSize.height

      // This is a simplified version - in a real app, you'd need to use html2canvas or similar
      // Since we can't directly access iframe content due to CORS, this is just a mockup
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = "20px Arial"
        ctx.fillStyle = "#333"
        ctx.textAlign = "center"
        ctx.fillText(`Screenshot of ${url}`, canvas.width / 2, canvas.height / 2 - 20)
        ctx.fillText(`${viewportSize.width}×${viewportSize.height}`, canvas.width / 2, canvas.height / 2 + 20)

        setScreenshot(canvas.toDataURL("image/png"))
        setScreenshotDialogOpen(true)
      }
    } catch (error) {
      console.error("Error taking screenshot:", error)
    }
  }

  const downloadScreenshot = () => {
    if (!screenshot) return

    const link = document.createElement("a")
    link.download = `screenshot-${viewportSize.width}x${viewportSize.height}.png`
    link.href = screenshot
    link.click()
  }

  const getDeviceIcon = () => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="h-5 w-5 text-purple-500" />
      case "tablet":
        return <Tablet className="h-5 w-5 text-purple-500" />
      case "tv":
        return <Monitor className="h-5 w-5 text-purple-500" />
      default:
        return <Laptop className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-purple-500 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Monitor className="mr-2 h-5 w-5" />
            UI Responsive Testing
          </CardTitle>
          <CardDescription>Test your website across different screen sizes and devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={loadWebsite}>
                  <Search className="mr-2 h-4 w-4" />
                  Load
                </Button>
                <Button variant="outline" className="border-purple-200" onClick={refreshWebsite}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>

            <Tabs defaultValue="preset" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-purple-100/50 p-1 rounded-xl">
                <TabsTrigger value="preset">Preset Devices</TabsTrigger>
                <TabsTrigger value="custom">Custom Size</TabsTrigger>
                <TabsTrigger value="saved">Saved Devices</TabsTrigger>
              </TabsList>

              <TabsContent value="preset" className="space-y-4 pt-4">
                <div className="flex flex-col space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="device-category">Device Category</Label>
                      <Select>
                        <SelectTrigger id="device-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="h-80">
                            {deviceCategories.map((category) => (
                              <SelectGroup key={category.label}>
                                <SelectLabel>{category.label}</SelectLabel>
                                {category.devices.map((device) => (
                                  <SelectItem
                                    key={device.name}
                                    value={device.name}
                                    onClick={() => handleDeviceSelect(device.name)}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <span>{device.name}</span>
                                      <Badge variant="outline" className="ml-2">
                                        {device.width}×{device.height}
                                      </Badge>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Device Type</Label>
                      <div className="grid grid-cols-4 gap-2">
                        <Button
                          variant={deviceType === "mobile" ? "default" : "outline"}
                          className={
                            deviceType === "mobile" ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200"
                          }
                          onClick={() => setDeviceType("mobile")}
                        >
                          <Smartphone className="mr-2 h-4 w-4" />
                          Mobile
                        </Button>
                        <Button
                          variant={deviceType === "tablet" ? "default" : "outline"}
                          className={
                            deviceType === "tablet" ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200"
                          }
                          onClick={() => setDeviceType("tablet")}
                        >
                          <Tablet className="mr-2 h-4 w-4" />
                          Tablet
                        </Button>
                        <Button
                          variant={deviceType === "desktop" ? "default" : "outline"}
                          className={
                            deviceType === "desktop" ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200"
                          }
                          onClick={() => setDeviceType("desktop")}
                        >
                          <Laptop className="mr-2 h-4 w-4" />
                          Desktop
                        </Button>
                        <Button
                          variant={deviceType === "tv" ? "default" : "outline"}
                          className={deviceType === "tv" ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200"}
                          onClick={() => setDeviceType("tv")}
                        >
                          <Monitor className="mr-2 h-4 w-4" />
                          TV
                        </Button>
                      </div>
                    </div>
                  </div>

                  {(deviceType === "mobile" || deviceType === "tablet") && (
                    <div className="space-y-2">
                      <Label>Orientation</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={orientation === "portrait" ? "default" : "outline"}
                          className={
                            orientation === "portrait" ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200"
                          }
                          onClick={() => handleOrientationChange("portrait")}
                        >
                          Portrait
                        </Button>
                        <Button
                          variant={orientation === "landscape" ? "default" : "outline"}
                          className={
                            orientation === "landscape" ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200"
                          }
                          onClick={() => handleOrientationChange("landscape")}
                        >
                          Landscape
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={viewportSize.width}
                      onChange={(e) => handleCustomSize("width", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={viewportSize.height}
                      onChange={(e) => handleCustomSize("height", e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-purple-200 text-purple-700"
                  onClick={saveCurrentDevice}
                >
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save Current Size
                </Button>
              </TabsContent>

              <TabsContent value="saved" className="space-y-4 pt-4">
                {savedDevices.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {savedDevices.map((device, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start border-purple-200"
                        onClick={() => {
                          const savedDevice = allDevices.find((d) => d.name === device)
                          if (savedDevice) {
                            handleDeviceSelect(device)
                          }
                        }}
                      >
                        <Bookmark className="mr-2 h-4 w-4" />
                        {device}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bookmark className="mx-auto h-12 w-12 mb-2 opacity-20" />
                    <p>No saved devices yet. Save a device from the preset or custom tabs.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="bg-purple-50/50 border-t flex justify-between">
          <div className="flex items-center space-x-2">
            {getDeviceIcon()}
            <span className="text-sm font-medium">
              {viewportSize.width} × {viewportSize.height} px
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="show-grid" checked={showGrid} onCheckedChange={setShowGrid} />
              <Label htmlFor="show-grid" className="text-sm">
                Show Grid
              </Label>
            </div>
            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
              {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
            </Badge>
          </div>
        </CardFooter>
      </Card>

      <Card className="border-t-4 border-t-purple-500 shadow-lg overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="text-purple-700">Preview</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-purple-200"
                onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <span className="text-sm">{Math.round(zoom * 100)}%</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-purple-200"
                onClick={() => setZoom(Math.min(1, zoom + 0.25))}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" className="border-purple-200" onClick={takeScreenshot}>
              <Camera className="mr-2 h-4 w-4" />
              Screenshot
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div
              ref={previewContainerRef}
              className="overflow-hidden rounded-md border border-gray-200 shadow-lg transition-all duration-300 relative"
              style={{
                width: `${Math.min(viewportSize.width * zoom, 1200)}px`,
                height: `${Math.min(viewportSize.height * zoom, 800)}px`,
                maxWidth: "100%",
              }}
            >
              {showGrid && (
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, ${gridColor} 1px, transparent 1px),
                      linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
                    `,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                  }}
                />
              )}

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              )}

              {url ? (
                <iframe
                  ref={iframeRef}
                  src={url}
                  title="Website Preview"
                  width={viewportSize.width}
                  height={viewportSize.height}
                  className="border-0"
                  style={{
                    width: `${viewportSize.width}px`,
                    height: `${viewportSize.height}px`,
                    transform: `scale(${zoom})`,
                    transformOrigin: "top left",
                  }}
                  onLoad={handleIframeLoad}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white p-4 text-center text-muted-foreground">
                  <div>
                    <Monitor className="mx-auto h-16 w-16 mb-4 text-purple-200" />
                    <p className="text-lg font-medium text-purple-700 mb-2">Enter a URL to preview the website</p>
                    <p className="text-sm text-muted-foreground">
                      Test how your website looks across different devices and screen sizes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-purple-50/50 border-t flex justify-between py-3">
          <div className="flex items-center space-x-2">
            <Label htmlFor="grid-size" className="text-sm">
              Grid Size:
            </Label>
            <Select value={gridSize.toString()} onValueChange={(value) => setGridSize(Number.parseInt(value))}>
              <SelectTrigger id="grid-size" className="w-[100px] h-8">
                <SelectValue placeholder="Grid Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">8px</SelectItem>
                <SelectItem value="16">16px</SelectItem>
                <SelectItem value="32">32px</SelectItem>
                <SelectItem value="64">64px</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} View
            </span>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={screenshotDialogOpen} onOpenChange={setScreenshotDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Screenshot</DialogTitle>
            <DialogDescription>
              Screenshot of {url || "website"} at {viewportSize.width}×{viewportSize.height}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-4 bg-gray-50 rounded-md">
            {screenshot && (
              <img
                src={screenshot || "/placeholder.svg"}
                alt="Website Screenshot"
                className="max-w-full max-h-[60vh] object-contain border shadow-sm"
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScreenshotDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={downloadScreenshot}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
