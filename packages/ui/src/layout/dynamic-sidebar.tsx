"use client"

import * as React from 'react'
import { pluginRegistry } from '@forge/core'
import type { PanelDefinition } from '@forge/core'
import type { UserPermissions } from '@forge/core'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible'
import { PluginErrorBoundary } from './plugin-error-boundary'
import { PluginSuspense } from './plugin-suspense'

interface DynamicSidebarProps {
  userPermissions?: UserPermissions
  onPanelToggle?: (panelId: string, collapsed: boolean) => void
}

export function DynamicSidebar({ 
  userPermissions, 
  onPanelToggle 
}: DynamicSidebarProps) {
  const [panels, setPanels] = React.useState<PanelDefinition[]>([])
  const [collapsedPanels, setCollapsedPanels] = React.useState<Set<string>>(new Set())

  React.useEffect(() => {
    const updatePanels = () => {
      const pluginPanels = pluginRegistry.getSidebarPanels(userPermissions)
      setPanels(pluginPanels)
      
      // Set default collapsed state for panels
      const defaultCollapsed = new Set<string>()
      pluginPanels.forEach(panel => {
        if (panel.defaultCollapsed) {
          defaultCollapsed.add(panel.id)
        }
      })
      setCollapsedPanels(defaultCollapsed)
    }

    updatePanels()
    const unsubscribe = pluginRegistry.subscribe(updatePanels)
    
    return unsubscribe
  }, [userPermissions])

  const togglePanel = (panelId: string) => {
    const newCollapsed = new Set(collapsedPanels)
    const isCollapsed = newCollapsed.has(panelId)
    
    if (isCollapsed) {
      newCollapsed.delete(panelId)
    } else {
      newCollapsed.add(panelId)
    }
    
    setCollapsedPanels(newCollapsed)
    onPanelToggle?.(panelId, !isCollapsed)
  }

  if (panels.length === 0) {
    return (
      <div className="w-80 p-4 bg-background border-l">
        <div className="text-sm text-muted-foreground text-center">
          No sidebar panels available
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 p-4 bg-background border-l space-y-4 overflow-y-auto">
      {panels.map((panel) => {
        const Icon = panel.icon
        const isCollapsed = collapsedPanels.has(panel.id)
        
        if (!panel.collapsible) {
          return (
            <Card key={panel.id}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  {Icon && <Icon className="h-4 w-4" />}
                  {panel.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PluginErrorBoundary pluginId={`panel-${panel.id}`}>
                  <PluginSuspense>
                    <panel.component />
                  </PluginSuspense>
                </PluginErrorBoundary>
              </CardContent>
            </Card>
          )
        }

        return (
          <Collapsible key={panel.id} open={!isCollapsed} onOpenChange={() => togglePanel(panel.id)}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      {panel.title}
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      {isCollapsed ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronUp className="h-3 w-3" />
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <PluginErrorBoundary pluginId={`panel-${panel.id}`}>
                    <PluginSuspense>
                      <panel.component />
                    </PluginSuspense>
                  </PluginErrorBoundary>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )
      })}
    </div>
  )
}