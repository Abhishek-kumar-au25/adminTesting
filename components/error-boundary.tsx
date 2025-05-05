"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // Show toast notification
    toast({
      title: "An error occurred",
      description: error.message,
      variant: "destructive",
    })

    // In a real app, you might send this to your error tracking service
    // Example: Sentry.captureException(error)
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-2xl mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{this.state.error?.message || "An unknown error occurred"}</AlertDescription>
          </Alert>

          <div className="bg-muted p-4 rounded-md mb-6 overflow-auto max-h-[300px]">
            <h3 className="font-bold mb-2">Error Details:</h3>
            <pre className="text-xs whitespace-pre-wrap">{this.state.error?.stack || "No stack trace available"}</pre>
            {this.state.errorInfo && (
              <>
                <h3 className="font-bold mt-4 mb-2">Component Stack:</h3>
                <pre className="text-xs whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
              </>
            )}
          </div>

          <div className="flex justify-center">
            <Button onClick={this.handleReset}>Try Again</Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
