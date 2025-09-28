"use client"

import * as React from 'react'
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

interface PluginErrorBoundaryProps {
  children: React.ReactNode
  pluginId: string
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class PluginErrorBoundaryClass extends React.Component<
  PluginErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: PluginErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Plugin Error in ${this.props.pluginId}:`, error, errorInfo)
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} retry={this.retry} />
      }

      return (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              Plugin Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Plugin "{this.props.pluginId}" encountered an error and failed to load.
            </p>
            {this.state.error && (
              <details className="text-xs">
                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                  Error Details
                </summary>
                <pre className="mt-2 whitespace-pre-wrap text-destructive">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={this.retry}
              className="w-full"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

export const PluginErrorBoundary = PluginErrorBoundaryClass