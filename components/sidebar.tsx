"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

import {
  LayoutDashboard,
  Smartphone,
  Shield,
  Code,
  AudioWaveformIcon as Waveform,
  FileText,
  Bug,
  Video,
  Settings,
  HelpCircle,
  Bell,
  User,
  Palette,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "UI Testing",
    href: "/dashboard/ui-testing",
    icon: Smartphone,
  },
  {
    title: "Security Testing",
    href: "/dashboard/security-testing",
    icon: Shield,
  },
  {
    title: "Automation",
    href: "/dashboard/automation",
    icon: Code,
  },
  {
    title: "Audio Analyzer",
    href: "/dashboard/audio-analyzer",
    icon: Waveform,
  },
  {
    title: "Test Cases",
    href: "/dashboard/test-cases",
    icon: FileText,
  },
  {
    title: "Defect Cases",
    href: "/dashboard/defect-cases",
    icon: Bug,
  },
  {
    title: "Video Players",
    href: "/dashboard/video-players",
    icon: Video,
  },
  {
    title: "Design Tool",
    href: "/dashboard/design-tool",
    icon: Palette,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed left-4 top-4 z-50 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex h-16 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <span className="text-lg">Testing Admin Panel</span>
            </Link>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
            <div className="px-2 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "hover:bg-muted hover:text-primary",
                    )}
                  >
                    <item.icon
                      className={cn("h-5 w-5 transition-transform", pathname === item.href ? "scale-110" : "")}
                    />
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 border-t pt-4">
                <div className="px-3 text-xs font-semibold text-muted-foreground mb-2">SETTINGS</div>
                <nav className="flex flex-col gap-2">
                  <Link
                    href="#"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    <Settings className="h-5 w-5" />
                    Preferences
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    <Bell className="h-5 w-5" />
                    Notifications
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    <HelpCircle className="h-5 w-5" />
                    Help & Support
                  </Link>
                </nav>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="hidden border-r bg-background md:block md:w-64 animate-fade-in">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="text-lg">Testing Admin Panel</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
        <div className="px-2 py-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted hover:text-primary",
                )}
              >
                <item.icon className={cn("h-5 w-5 transition-transform", pathname === item.href ? "scale-110" : "")} />
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="mt-8 border-t pt-4">
            <div className="px-3 text-xs font-semibold text-muted-foreground mb-2">SETTINGS</div>
            <nav className="flex flex-col gap-2">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Settings className="h-5 w-5" />
                Preferences
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Bell className="h-5 w-5" />
                Notifications
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <HelpCircle className="h-5 w-5" />
                Help & Support
              </Link>
            </nav>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
