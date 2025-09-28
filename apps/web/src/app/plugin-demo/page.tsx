"use client"

import * as React from 'react'
import { initializePlugins } from "../../lib/plugin-init"
import {
  DynamicSidebar,
  DynamicTabs,
  DynamicContentRouter,
  usePluginStore
} from "@forge/ui/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@forge/ui/components"

export default function PluginDemoPage() {
  const { activeTab, setActiveTab } = usePluginStore()
  const [pluginsInitialized, setPluginsInitialized] = React.useState(false)
  
  React.useEffect(() => {
    const init = async () => {
      try {
        await initializePlugins()
        setPluginsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize plugins:', error)
        setPluginsInitialized(true) // Still show UI even if plugins fail
      }
    }
    
    init()
  }, [])

  // Mock user permissions
  const userPermissions = React.useMemo(() => ({
    user_id: "user-123",
    tenant_id: "tenant-123",
    roles: ["manager"],
    direct_permissions: [
      "dashboard:read",
      "inventory:read",
      "inventory:create",
      "asset:read",
      "workorder:read"
    ]
  }), [])

  if (!pluginsInitialized) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading plugins...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Plugin System Demo</CardTitle>
            <CardDescription>
              Dynamic plugin system with tabs, sidebar panels, and content routing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main content with tabs */}
              <div className="lg:col-span-3">
                <DynamicTabs
                  userPermissions={userPermissions}
                  defaultTab={activeTab}
                  onTabChange={setActiveTab}
                />
                
                {/* Content router fallback */}
                <div className="mt-6">
                  <DynamicContentRouter
                    path="/demo"
                    userPermissions={userPermissions}
                    fallback={() => (
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-muted-foreground">
                            No plugin content available for this path.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  />
                </div>
              </div>
              
              {/* Dynamic sidebar */}
              <div className="lg:col-span-1">
                <DynamicSidebar 
                  userPermissions={userPermissions}
                  onPanelToggle={(panelId: string, collapsed: boolean) => {
                    console.log(`Panel ${panelId} ${collapsed ? 'collapsed' : 'expanded'}`)
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}