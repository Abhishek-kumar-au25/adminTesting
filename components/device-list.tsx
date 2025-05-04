"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Tablet, Laptop, Monitor, Tv, Search } from "lucide-react"

export function DeviceList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const devices = {
    mobile: [
      { name: "iPhone SE", size: "375x667" },
      { name: "iPhone 12/13 Mini", size: "375x812" },
      { name: "iPhone 12/13", size: "390x844" },
      { name: "iPhone 12/13 Pro Max", size: "428x926" },
      { name: "iPhone 14 Pro", size: "393x852" },
      { name: "iPhone 14 Pro Max", size: "430x932" },
      { name: "Samsung Galaxy S21", size: "360x800" },
      { name: "Samsung Galaxy S22", size: "384x824" },
      { name: "Samsung Galaxy S23", size: "393x851" },
      { name: "Samsung Galaxy Z Flip", size: "412x846" },
      { name: "Google Pixel 5", size: "393x851" },
      { name: "Google Pixel 6", size: "412x915" },
      { name: "Google Pixel 7", size: "411x914" },
      { name: "OnePlus 9", size: "412x919" },
      { name: "Xiaomi Mi 11", size: "393x873" },
    ],
    tablet: [
      { name: "iPad Mini", size: "768x1024" },
      { name: "iPad Air", size: "820x1180" },
      { name: 'iPad Pro 11"', size: "834x1194" },
      { name: 'iPad Pro 12.9"', size: "1024x1366" },
      { name: "Samsung Galaxy Tab S7", size: "800x1280" },
      { name: "Samsung Galaxy Tab S8", size: "800x1280" },
      { name: "Samsung Galaxy Tab S8+", size: "834x1220" },
      { name: "Samsung Galaxy Tab S8 Ultra", size: "1120x1752" },
      { name: "Microsoft Surface Pro 8", size: "912x1368" },
      { name: "Amazon Fire HD 10", size: "800x1280" },
      { name: "Lenovo Tab P11 Pro", size: "1200x1600" },
      { name: "Huawei MatePad Pro", size: "1600x2560" },
    ],
    laptop: [
      { name: 'MacBook Air 13"', size: "1280x800" },
      { name: 'MacBook Pro 13"', size: "1440x900" },
      { name: 'MacBook Pro 14"', size: "1512x982" },
      { name: 'MacBook Pro 16"', size: "1536x960" },
      { name: "Dell XPS 13", size: "1920x1080" },
      { name: "Dell XPS 15", size: "1920x1200" },
      { name: "Dell XPS 17", size: "1920x1200" },
      { name: "HP Spectre x360", size: "1920x1080" },
      { name: "Lenovo ThinkPad X1", size: "1920x1080" },
      { name: "Microsoft Surface Laptop", size: "2256x1504" },
      { name: "ASUS ZenBook", size: "1920x1080" },
      { name: "Razer Blade 15", size: "1920x1080" },
      { name: "Acer Swift 5", size: "1920x1080" },
    ],
    desktop: [
      { name: "Full HD Monitor", size: "1920x1080" },
      { name: "QHD Monitor", size: "2560x1440" },
      { name: "4K UHD Monitor", size: "3840x2160" },
      { name: "5K Monitor", size: "5120x2880" },
      { name: "Ultrawide 21:9", size: "2560x1080" },
      { name: "Ultrawide QHD 21:9", size: "3440x1440" },
      { name: "Super Ultrawide 32:9", size: "3840x1080" },
      { name: "Super Ultrawide QHD 32:9", size: "5120x1440" },
      { name: 'iMac 24"', size: "4480x2520" },
      { name: 'iMac 27"', size: "5120x2880" },
      { name: "Mac Studio Display", size: "5120x2880" },
      { name: "Mac Pro Display XDR", size: "6016x3384" },
    ],
    tv: [
      { name: "HD TV (720p)", size: "1280x720" },
      { name: "Full HD TV (1080p)", size: "1920x1080" },
      { name: "4K UHD TV", size: "3840x2160" },
      { name: "8K UHD TV", size: "7680x4320" },
      { name: "Samsung Smart TV", size: "1920x1080" },
      { name: "LG OLED TV", size: "3840x2160" },
      { name: "Sony Bravia", size: "3840x2160" },
      { name: "TCL Roku TV", size: "1920x1080" },
      { name: "Vizio SmartCast TV", size: "3840x2160" },
      { name: "Hisense Smart TV", size: "3840x2160" },
      { name: "Philips Android TV", size: "3840x2160" },
      { name: "Panasonic Smart TV", size: "3840x2160" },
    ],
  }

  const allDevices = [
    ...devices.mobile.map((device) => ({ ...device, type: "mobile" })),
    ...devices.tablet.map((device) => ({ ...device, type: "tablet" })),
    ...devices.laptop.map((device) => ({ ...device, type: "laptop" })),
    ...devices.desktop.map((device) => ({ ...device, type: "desktop" })),
    ...devices.tv.map((device) => ({ ...device, type: "tv" })),
  ]

  const filteredDevices = allDevices.filter(
    (device) =>
      (activeTab === "all" || device.type === activeTab) &&
      (device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.type.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      case "laptop":
        return <Laptop className="h-4 w-4" />
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "tv":
        return <Tv className="h-4 w-4" />
      default:
        return <Smartphone className="h-4 w-4" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Device List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-1">
              <Smartphone className="h-3 w-3" /> Mobile
            </TabsTrigger>
            <TabsTrigger value="tablet" className="flex items-center gap-1">
              <Tablet className="h-3 w-3" /> Tablet
            </TabsTrigger>
            <TabsTrigger value="laptop" className="flex items-center gap-1">
              <Laptop className="h-3 w-3" /> Laptop
            </TabsTrigger>
            <TabsTrigger value="desktop" className="flex items-center gap-1">
              <Monitor className="h-3 w-3" /> Desktop
            </TabsTrigger>
            <TabsTrigger value="tv" className="flex items-center gap-1">
              <Tv className="h-3 w-3" /> TV
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {filteredDevices.map((device, index) => (
              <Button key={index} variant="outline" className="w-full justify-start">
                <div className="mr-2">{getDeviceIcon(device.type)}</div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{device.name}</div>
                  <div className="text-xs text-muted-foreground">{device.size}</div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
