"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RotateCw, Eye, Grid, ImageIcon } from "lucide-react"

export function ResponsiveTestingControls() {
  const [orientation, setOrientation] = useState("portrait")
  const [showGrid, setShowGrid] = useState(false)
  const [showImages, setShowImages] = useState(true)
  const [zoomLevel, setZoomLevel] = useState([100])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testing Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Orientation</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOrientation(orientation === "portrait" ? "landscape" : "portrait")}
            >
              <RotateCw className="mr-2 h-4 w-4" />
              {orientation === "portrait" ? "Portrait" : "Landscape"}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Zoom Level: {zoomLevel}%</Label>
          <Slider value={zoomLevel} min={50} max={200} step={10} onValueChange={setZoomLevel} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="show-grid" checked={showGrid} onCheckedChange={setShowGrid} />
            <Label htmlFor="show-grid" className="flex items-center">
              <Grid className="mr-2 h-4 w-4" />
              Show Grid Overlay
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="show-images" checked={showImages} onCheckedChange={setShowImages} />
            <Label htmlFor="show-images" className="flex items-center">
              <ImageIcon className="mr-2 h-4 w-4" />
              Show Images
            </Label>
          </div>
        </div>

        <div className="pt-2">
          <Button className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            Take Screenshot
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
