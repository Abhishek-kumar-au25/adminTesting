"use client"

import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Menu,
  Monitor,
  ShieldAlert,
  FileCode,
  Headphones,
  FileText,
  Accessibility,
  Globe,
  Gauge,
  Server,
  Layers,
  Settings,
  ChevronRight,
  Pencil,
  Tv,
} from "lucide-react"
import ResponsiveTestingPanel from "@/components/responsive-testing-panel"
import SecurityTestingPanel from "@/components/security-testing-panel"
import AutomationPanel from "@/components/automation-panel"
import AudioAnalyzerPanel from "@/components/audio-analyzer-panel"
import TestCasePanel from "@/components/test-case-panel"
import AccessibilityTestingPanel from "@/components/accessibility-testing-panel"
import MultiVideoPlayer from "@/components/multi-video-player"
import { cn } from "@/lib/utils"

export default function AdminPanel() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [activeTab, setActiveTab] = useState("responsive")

  const tabs = [
    { id: "responsive", label: "UI Responsive Testing", icon: <Monitor className="h-5 w-5" /> },
    { id: "security", label: "Security Testing", icon: <ShieldAlert className="h-5 w-5" /> },
    { id: "automation", label: "Automation Scripts", icon: <FileCode className="h-5 w-5" /> },
    { id: "audio", label: "Audio Analyzer", icon: <Headphones className="h-5 w-5" /> },
    { id: "testcases", label: "Test Case Management", icon: <FileText className="h-5 w-5" /> },
    { id: "accessibility", label: "Accessibility Testing", icon: <Accessibility className="h-5 w-5" /> },
    { id: "videoplayer", label: "Multi-Video Player", icon: <Tv className="h-5 w-5" /> },
    { id: "seo", label: "SEO Testing", icon: <Globe className="h-5 w-5" /> },
    { id: "performance", label: "Performance Testing", icon: <Gauge className="h-5 w-5" /> },
    { id: "api", label: "API Testing", icon: <Server className="h-5 w-5" /> },
    { id: "compatibility", label: "Cross-Browser Testing", icon: <Layers className="h-5 w-5" /> },
    { id: "figma", label: "Figma Integration", icon: <Pencil className="h-5 w-5" /> },
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (!isDesktop) {
      setOpen(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {isDesktop ? (
        <div className="w-72 border-r bg-white/80 backdrop-blur-sm p-0 shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Testing Admin
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Comprehensive Testing Suite</p>
          </div>
          <ScrollArea className="h-[calc(100vh-88px)]">
            <div className="p-4 space-y-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start py-6 px-4 rounded-lg transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-sm"
                      : "hover:bg-purple-50",
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className="flex items-center w-full">
                    <div
                      className={cn(
                        "mr-3 rounded-md p-1",
                        activeTab === tab.id ? "bg-purple-200 text-purple-700" : "text-muted-foreground",
                      )}
                    >
                      {tab.icon}
                    </div>
                    <span className="flex-1 text-left">{tab.label}</span>
                    {activeTab === tab.id && <ChevronRight className="h-4 w-4 text-purple-500" />}
                  </div>
                </Button>
              ))}

              <div className="pt-4 mt-4 border-t">
                <Button variant="ghost" className="w-full justify-start py-6 px-4 rounded-lg hover:bg-purple-50">
                  <div className="flex items-center w-full">
                    <div className="mr-3 rounded-md p-1 text-muted-foreground">
                      <Settings className="h-5 w-5" />
                    </div>
                    <span className="flex-1 text-left">Settings</span>
                  </div>
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="p-6 border-b">
              <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Testing Admin
              </SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">Comprehensive Testing Suite</p>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-88px)]">
              <div className="p-4 space-y-1">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start py-6 px-4 rounded-lg transition-all duration-200",
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-sm"
                        : "hover:bg-purple-50",
                    )}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    <div className="flex items-center w-full">
                      <div
                        className={cn(
                          "mr-3 rounded-md p-1",
                          activeTab === tab.id ? "bg-purple-200 text-purple-700" : "text-muted-foreground",
                        )}
                      >
                        {tab.icon}
                      </div>
                      <span className="flex-1 text-left">{tab.label}</span>
                      {activeTab === tab.id && <ChevronRight className="h-4 w-4 text-purple-500" />}
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      )}

      <div className={cn("flex-1 p-6 bg-white/70 backdrop-blur-sm", !isDesktop && "pt-16")}>
        <div className="mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="responsive">
              <ResponsiveTestingPanel />
            </TabsContent>
            <TabsContent value="security">
              <SecurityTestingPanel />
            </TabsContent>
            <TabsContent value="automation">
              <AutomationPanel />
            </TabsContent>
            <TabsContent value="audio">
              <AudioAnalyzerPanel />
            </TabsContent>
            <TabsContent value="testcases">
              <TestCasePanel />
            </TabsContent>
            <TabsContent value="accessibility">
              <AccessibilityTestingPanel />
            </TabsContent>
            <TabsContent value="videoplayer">
              <MultiVideoPlayer />
            </TabsContent>
            <TabsContent value="seo">
              <div className="flex h-[70vh] items-center justify-center">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-purple-200 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-purple-700 mb-2">SEO Testing</h3>
                  <p className="text-muted-foreground max-w-md">
                    This module is coming soon. It will help you analyze and improve your website's search engine
                    optimization.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="performance">
              <div className="flex h-[70vh] items-center justify-center">
                <div className="text-center">
                  <Gauge className="h-16 w-16 text-purple-200 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-purple-700 mb-2">Performance Testing</h3>
                  <p className="text-muted-foreground max-w-md">
                    This module is coming soon. It will help you measure and optimize your website's loading speed and
                    performance.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="api">
              <div className="flex h-[70vh] items-center justify-center">
                <div className="text-center">
                  <Server className="h-16 w-16 text-purple-200 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-purple-700 mb-2">API Testing</h3>
                  <p className="text-muted-foreground max-w-md">
                    This module is coming soon. It will help you test and validate your API endpoints.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="compatibility">
              <div className="flex h-[70vh] items-center justify-center">
                <div className="text-center">
                  <Layers className="h-16 w-16 text-purple-200 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-purple-700 mb-2">Cross-Browser Testing</h3>
                  <p className="text-muted-foreground max-w-md">
                    This module is coming soon. It will help you test your website across different browsers and
                    platforms.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="figma">
              <div className="flex h-[70vh] items-center justify-center">
                <div className="text-center">
                  <Pencil className="h-16 w-16 text-purple-200 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-purple-700 mb-2">Figma Integration</h3>
                  <p className="text-muted-foreground max-w-md">
                    This module is coming soon. It will allow you to create wireframes and prototypes directly within
                    the admin panel.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
