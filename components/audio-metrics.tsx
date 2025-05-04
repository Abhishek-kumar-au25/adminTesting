import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"

export function AudioMetrics() {
  // Sample data for audio metrics
  const frequencyData = [
    { name: "125Hz", value: 65 },
    { name: "250Hz", value: 78 },
    { name: "500Hz", value: 82 },
    { name: "1kHz", value: 70 },
    { name: "2kHz", value: 65 },
    { name: "4kHz", value: 58 },
    { name: "8kHz", value: 45 },
    { name: "16kHz", value: 30 },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Audio Metrics</CardTitle>
          <Badge variant="outline">Real-time</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="text-sm font-medium">Frequency Spectrum</div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frequencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Peak Level</div>
            <div className="text-lg font-bold">-3.2 dB</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">RMS Level</div>
            <div className="text-lg font-bold">-18.5 dB</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Dynamic Range</div>
            <div className="text-lg font-bold">15.3 dB</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Sample Rate</div>
            <div className="text-lg font-bold">44.1 kHz</div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">Audio Quality</div>
          <div className="flex items-center">
            <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-4/5 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2 text-sm font-medium">Good</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
