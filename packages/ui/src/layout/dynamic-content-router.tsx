"use client"

import * as React from 'react'
import { pluginRegistry } from '@forge/core'
import type { ContentDefinition } from '@forge/core'
import type { UserPermissions } from '@forge/core'
import { PluginErrorBoundary } from './plugin-error-boundary'
import { PluginSuspense } from './plugin-suspense'

interface DynamicContentRouterProps {
  path: string
  userPermissions?: UserPermissions
  fallback?: React.ComponentType<{ path: string }>
}

const DefaultNotFoundFallback = ({ path }: { path: string }) => (
  <div className="flex flex-col items-center justify-center h-64 text-center">
    <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
    <p className="text-muted-foreground">
      No plugin content found for path: {path}
    </p>
  </div>
)

export function DynamicContentRouter({ 
  path, 
  userPermissions, 
  fallback: NotFoundComponent = DefaultNotFoundFallback 
}: DynamicContentRouterProps) {
  const [content, setContent] = React.useState<ContentDefinition[]>([])

  React.useEffect(() => {
    const updateContent = () => {
      const pluginContent = pluginRegistry.getMainContent(userPermissions)
      setContent(pluginContent)
    }

    updateContent()
    const unsubscribe = pluginRegistry.subscribe(updateContent)
    
    return unsubscribe
  }, [userPermissions])

  // Find matching content for the current path
  const matchedContent = React.useMemo(() => {
    return content.find(item => {
      // Simple path matching - can be enhanced with pattern matching
      return item.path === path || path.startsWith(item.path)
    })
  }, [content, path])

  if (!matchedContent) {
    return <NotFoundComponent path={path} />
  }

  return (
    <PluginErrorBoundary pluginId={`content-${matchedContent.id}`}>
      <PluginSuspense>
        <matchedContent.component />
      </PluginSuspense>
    </PluginErrorBoundary>
  )
}