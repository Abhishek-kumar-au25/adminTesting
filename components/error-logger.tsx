"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type ErrorLog = {
  id: string
  message: string
  stack?: string
  timestamp: Date
  severity: "error" | "warning" | "info"
}

export function ErrorLogger() {
  const [errors, setErrors] = useState<ErrorLog[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Initialize error tracking
  useEffect(() => {
    // Track existing errors
    const existingErrors = localStorage.getItem("errorLogs")
    if (existingErrors) {
      try {
        const parsedErrors = JSON.parse(existingErrors)
        // Convert string timestamps back to Date objects
        const formattedErrors = parsedErrors.map((err: any) => ({
          ...err,
          timestamp: new Date(err.timestamp),
        }))
        setErrors(formattedErrors)
      } catch (e) {
        console.error("Failed to parse error logs:", e)
      }
    }

    // Set up global error handler
    const originalConsoleError = console.error
    console.error = (...args) => {
      // Call the original console.error
      originalConsoleError.apply(console, args)

      // Log the error
      const errorMessage = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" ")

      const newError: ErrorLog = {
        id: Date.now().toString(),
        message: errorMessage,
        stack: new Error().stack,
        timestamp: new Date(),
        severity: "error",
      }

      setErrors((prev) => {
        const updated = [newError, ...prev].slice(0, 100) // Keep only the last 100 errors

        // Save to localStorage
        try {
          localStorage.setItem("errorLogs", JSON.stringify(updated))
        } catch (e) {
          console.log("Failed to save error logs to localStorage")
        }

        return updated
      })
    }

    // Set up window error handler
    const handleWindowError = (event: ErrorEvent) => {
      const newError: ErrorLog = {
        id: Date.now().toString(),
        message: event.message,
        stack: event.error?.stack,
        timestamp: new Date(),
        severity: "error",
      }

      setErrors((prev) => {
        const updated = [newError, ...prev].slice(0, 100)
        try {
          localStorage.setItem("errorLogs", JSON.stringify(updated))
        } catch (e) {
          console.log("Failed to save error logs to localStorage")
        }
        return updated
      })
    }

    window.addEventListener("error", handleWindowError)

    // Cleanup
    return () => {
      console.error = originalConsoleError
      window.removeEventListener("error", handleWindowError)
    }
  }, [])

  const clearErrors = () => {
    setErrors([])
    localStorage.removeItem("errorLogs")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleString()
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "destructive"
      case "warning":
        return "default" // Using default which is typically amber/yellow
      case "info":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <AlertCircle className="h-5 w-5" />
          {errors.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {errors.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Error Logs</span>
            <Button variant="outline" size="sm" onClick={clearErrors}>
              Clear All
            </Button>
          </DialogTitle>
          <DialogDescription>System has logged {errors.length} errors or warnings.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 mt-4 border rounded-md">
          {errors.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No errors logged yet.</div>
          ) : (
            <div className="divide-y">
              {errors.map((error) => (
                <div key={error.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={getSeverityColor(error.severity) as any}>{error.severity.toUpperCase()}</Badge>
                    <span className="text-xs text-muted-foreground">{formatTime(error.timestamp)}</span>
                  </div>
                  <p className="font-medium mb-1">{error.message}</p>
                  {error.stack && (
                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto mt-2">{error.stack}</pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
