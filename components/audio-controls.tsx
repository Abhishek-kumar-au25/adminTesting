import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Mic, Download, Share2 } from "lucide-react"

export function AudioControls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audio Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center">
              <Volume2 className="mr-2 h-4 w-4" />
              Volume
            </Label>
            <span className="text-sm">80%</span>
          </div>
          <Slider defaultValue={[80]} max={100} step={1} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center">
              <Mic className="mr-2 h-4 w-4" />
              Microphone Sensitivity
            </Label>
            <span className="text-sm">60%</span>
          </div>
          <Slider defaultValue={[60]} max={100} step={1} />
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center space-x-2">
            <Switch id="noise-reduction" defaultChecked />
            <Label htmlFor="noise-reduction">Noise Reduction</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="auto-gain" />
            <Label htmlFor="auto-gain">Auto Gain Control</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="echo-cancellation" defaultChecked />
            <Label htmlFor="echo-cancellation">Echo Cancellation</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="mute" />
            <Label htmlFor="mute" className="flex items-center">
              <VolumeX className="mr-2 h-4 w-4" />
              Mute
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
