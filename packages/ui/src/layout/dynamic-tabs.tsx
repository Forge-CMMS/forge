"use client"

import * as React from 'react'
import { pluginRegistry } from '@forge/core'
import type { TabDefinition } from '@forge/core'
import type { UserPermissions } from '@forge/core'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { PluginErrorBoundary } from './plugin-error-boundary'
import { PluginSuspense } from './plugin-suspense'

interface DynamicTabsProps {
  userPermissions?: UserPermissions
  defaultTab?: string
  onTabChange?: (tabId: string) => void
}

export function DynamicTabs({ 
  userPermissions, 
  defaultTab, 
  onTabChange 
}: DynamicTabsProps) {
  const [tabs, setTabs] = React.useState<TabDefinition[]>([])
  const [activeTab, setActiveTab] = React.useState<string>(defaultTab || '')

  React.useEffect(() => {
    const updateTabs = () => {
      const pluginTabs = pluginRegistry.getTabs(userPermissions)
      setTabs(pluginTabs)
      
      // Set default tab if not set
      if (!activeTab && pluginTabs.length > 0) {
        setActiveTab(pluginTabs[0].id)
      }
    }

    updateTabs()
    const unsubscribe = pluginRegistry.subscribe(updateTabs)
    
    return unsubscribe
  }, [userPermissions, activeTab])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  if (tabs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No tabs available
      </div>
    )
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              {tab.label}
            </TabsTrigger>
          )
        })}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-6">
          <PluginErrorBoundary pluginId={`tab-${tab.id}`}>
            <PluginSuspense>
              <tab.component />
            </PluginSuspense>
          </PluginErrorBoundary>
        </TabsContent>
      ))}
    </Tabs>
  )
}