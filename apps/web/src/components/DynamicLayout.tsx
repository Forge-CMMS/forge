"use client"

import * as React from "react"
import { AppSidebar } from "@forge/ui/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@forge/ui/components/ui/sidebar"
import { Button } from "@forge/ui/components/ui/button"
import { Separator } from "@forge/ui/components/ui/separator"
import { Building2, PanelRight } from "lucide-react"
import {
  DynamicSidebar,
  DynamicTabs,
  DynamicContentRouter,
  usePluginStore
} from "@forge/ui"
import { pluginRegistry } from "@forge/core"

// Plugin-aware header component
function DynamicBreadcrumbHeader() {
  const { toggleRightSidebar } = useSidebar()
  
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="text-sm text-muted-foreground">
          Dashboard / Overview
        </div>
      </div>
      <div className="ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={toggleRightSidebar}
        >
          <PanelRight className="h-4 w-4" />
          <span className="sr-only">Toggle Right Sidebar</span>
        </Button>
      </div>
    </header>
  )
}

// Main content footer
function MainContentFooter() {
  return (
    <footer className="sticky bottom-0 border-t bg-background h-16 flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Forge CMMS. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/help" className="text-sm text-muted-foreground hover:text-foreground">
            Help
          </a>
          <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </a>
          <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}

interface DynamicLayoutProps {
  children: React.ReactNode
  currentPath?: string
}

export default function DynamicLayout({
  children,
  currentPath = "/dashboard"
}: DynamicLayoutProps) {
  const { activeTab, setActiveTab } = usePluginStore()
  
  React.useEffect(() => {
    // Initialize plugins on mount
    const initializePlugins = async () => {
      try {
        // Load any registered plugins
        const plugins = pluginRegistry.getAllPlugins()
        for (const plugin of plugins) {
          try {
            await pluginRegistry.load(plugin.id)
          } catch (error) {
            console.warn(`Failed to load plugin ${plugin.id}:`, error)
          }
        }
      } catch (error) {
        console.error("Failed to initialize plugins:", error)
      }
    }

    initializePlugins()
  }, [])

  // Mock user permissions (in real app, this would come from auth context)
  const userPermissions = React.useMemo(() => ({
    user_id: "user-123",
    tenant_id: "tenant-123",
    roles: ["manager"],
    direct_permissions: [
      "inventory:read",
      "inventory:create",
      "asset:read",
      "workorder:read"
    ]
  }), [])

  return (
    <SidebarProvider>
      <div className="grid grid-cols-[auto_1fr_auto] h-screen w-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen min-w-0">
          <DynamicBreadcrumbHeader />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {/* Main content area with dynamic tabs */}
              <DynamicTabs
                userPermissions={userPermissions}
                defaultTab={activeTab}
                onTabChange={setActiveTab}
              />
              
              {/* Fallback to regular children if no tabs are available */}
              <div className="mt-6">
                <DynamicContentRouter
                  path={currentPath}
                  userPermissions={userPermissions}
                  fallback={() => children}
                />
              </div>
            </div>
          </div>
          <MainContentFooter />
        </SidebarInset>
        <DynamicSidebar 
          userPermissions={userPermissions}
          onPanelToggle={(panelId, collapsed) => {
            console.log(`Panel ${panelId} ${collapsed ? 'collapsed' : 'expanded'}`)
          }}
        />
      </div>
    </SidebarProvider>
  )
}