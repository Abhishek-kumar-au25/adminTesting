import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import ErrorBoundary from "@/components/error-boundary"
import { ErrorLogger } from "@/components/error-logger"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-end border-b px-6">
          <ErrorLogger />
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
